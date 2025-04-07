import { Response } from 'express';

import UserModel from '../models/user';
import { UserRole } from '../types/user';
import { handleErrors } from '../config/handle-error';
import { ExpressRequest } from '../types/expressRequest.interface';
import { normalizeUser } from '../config/normalize-user';


const currentUser = async (req: ExpressRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'You are not authorized to access this resource.'
    });
    return;
  }
  res.send(normalizeUser(req.user))
}

const updateUser = async (req: ExpressRequest, res: Response) => {
  // todo add validation that user can update only his own data
  try {
    if (!req.user) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'You are not authorized to access this resource.'
      });
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

const getUserById = async (req: ExpressRequest, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      res.status(404).json({
        error: 'User not found',
        message: 'The user with the specified ID was not found.'
      });
      return;
    }
    if (user.role === UserRole.ADMIN && req.user && user.id !== req.user.id) {
      res.status(403).json({
        error: 'Access denied',
        message: 'You do not have permission to access this resource.'
      });
      return;
    }
    res.status(200).json(normalizeUser(user));
  } catch (err) {
    handleErrors(err, res)
  }
}

// todo need to test (added logic of deleting without id)
const deleteUser = async (req: ExpressRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(404).json({
        error: 'User not found',
        message: 'The user with the specified ID was not found.'
      });
      return;
    }
    if (user.role === UserRole.ADMIN && req.user && user.id !== req.user.id) {
      res.status(403).json({
        error: 'Access denied',
        message: 'You do not have permission to access this resource.'
      });
      return;
    }
    await UserModel.deleteOne({ _id: req.params.userId });
    res.status(204).end();
  } catch (err) {
    handleErrors(err, res)
  }
}

export default {
  // currentUser,
  updateUser,
  getUsersList,
  getUserById,
  deleteUser
}
