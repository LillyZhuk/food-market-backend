import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

import UserModel from '../models/user';
import { UserDocument, UserRole } from '../types/user';
import { JWT_SECRET } from '../config/config';
import { handleErrors } from '../config/handle-error';
import { ExpressRequest } from '../types/expressRequest.interface';

const normalizeUser = (user: UserDocument) => {
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    newsletterConsent: user.newsletterConsent,
    id: user.id,
    token
  }
}

const register = async (req: Request, res: Response) => {
  try {
    if (req.body.password !== req.body.repeatedPassword) {
      res.status(400).json({ error: 'Passwords do not match' });
      return;
    }
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(400).json({ error: 'Email already in use' });
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
      res.status(422).json({ error: 'Incorrect email' });
      return;
    }
    const isSamePassword = await user.validatePassword(req.body.password);
    if (!isSamePassword) {
      res.status(401).json({ error: 'Incorrect password' });
      return;
    }
    res.status(201).json(normalizeUser(user));
  } catch (err) {
    handleErrors(err, res)
  }
}

const currentUser = async (req: ExpressRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  res.send(normalizeUser(req.user))
}
// todo need to test // todo add description to postman
const checkUserByEmail = async (req: ExpressRequest, res: Response) => {
  try {
    const { email } = req.query;
    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }
    const user = await UserModel.findOne({ email: String(email) });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json({ message: 'User found' });
  } catch (error) {
    handleErrors(error, res)
  }
}
// todo add description to postman
const resetPassword = async (req: ExpressRequest, res: Response) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      res.status(400).json({ error: 'Email and new password are required' });
      return;
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    await UserModel.updateOne(
      { email },
      { $set: { password:  hashedPassword } }
    );
    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    handleErrors(error, res)
  }
}
// todo add description to postman
const updateUser = async (req: ExpressRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const updatedUser = await UserModel.findByIdAndUpdate(req.body.id, req.body, {new: true});
    res.status(200).json(updatedUser)
  } catch (err) {
    handleErrors(err, res)
  }
}
// todo add description to postman
// todo add filter for users by name or lastname
const getUsersList = async (req: ExpressRequest, res: Response) => {
  const pageSize = Number(req.query.pageSize) || 10;
  const currentPage = Number(req.query.page) || 1;
  const filter = { role: UserRole.USER };
  try {
    const users = await UserModel.find(filter)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);
    const count = await UserModel.countDocuments(filter);

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      currentPage,
      pageSize,
      results: users
    });
  } catch (err) {
    handleErrors(err, res)
  }
}
// todo add description to postman
const getUserById = async (req: ExpressRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    if (user.role === UserRole.ADMIN && req.user && user.id !== req.user.id) {
      res.status(403).json({ error: 'Access denied' });
      return;
    }
    res.status(200).json(normalizeUser(user));
  } catch (err) {
    handleErrors(err, res)
  }
}
// todo need to test // todo add description to postman
const deleteUser = async (req: ExpressRequest, res: Response) => {
  try {
    await UserModel.deleteOne({ _id: req.params.userId });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    handleErrors(err, res)
  }
}

export default {
  register,
  login,
  currentUser,
  checkUserByEmail,
  resetPassword,
  updateUser,
  getUsersList,
  getUserById,
  deleteUser
}
