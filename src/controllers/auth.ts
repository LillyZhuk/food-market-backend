import { ExpressRequest } from '../types/expressRequest.interface';
import { Request, Response } from 'express';
import UserModel from '../models/user';
import bcryptjs from 'bcryptjs';
import { handleErrors } from '../config/handle-error';
import { normalizeUser } from '../config/normalize-user';

const register = async (req: Request, res: Response) => {
  try {
    if (req.body.password !== req.body.repeatedPassword) {
      res.status(400).json({
        error: 'Passwords do not match',
        message: 'Password and repeated password do not match'
      });
      return;
    }
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(400).json({
        error: 'Email already in use',
        message: 'This email is already associated with an existing account'
      });
      return;
    }
    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(normalizeUser(savedUser));
  } catch (err) {
    handleErrors(err, res)
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).select('+password');
    if (!user) {
      res.status(422).json({
        error: 'Incorrect email',
        message: 'No account found with the provided email'
      });
      return;
    }
    const isSamePassword = await user.validatePassword(req.body.password);
    if (!isSamePassword) {
      res.status(401).json({
        error: 'Incorrect password',
        message: 'The password you entered is incorrect'
      });
      return;
    }
    res.status(201).json(normalizeUser(user));
  } catch (err) {
    handleErrors(err, res)
  }
}

const checkUserByEmail = async (req: ExpressRequest, res: Response) => {
  try {
    const { email } = req.query;
    if (!email) {
      res.status(400).json({
        error: 'Email is required',
        message: 'Email is required'
      });
      return;
    }
    const user = await UserModel.findOne({ email: String(email) });
    if (!user) {
      res.status(404).json({
        error: 'User not found',
        message: 'No user found with the provided email'
      });
      return;
    }
    res.status(204).end();
  } catch (error) {
    handleErrors(error, res)
  }
}

const resetPassword = async (req: ExpressRequest, res: Response) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      res.status(400).json({
        error: 'Fields are required',
        message: 'Email and new password are required'
      });
      return;
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({
        error: 'User not found',
        message: 'No user found with the provided email'
      });
      return;
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    await UserModel.updateOne(
      { email },
      { $set: { password:  hashedPassword } }
    );
    res.status(204).end();
  } catch (error) {
    handleErrors(error, res)
  }
}

export default {
  register,
  login,
  checkUserByEmail,
  resetPassword
}
