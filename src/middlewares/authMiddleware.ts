import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { ExpressRequest } from '../types/expressRequest.interface';
import { JWT_SECRET } from '../config/config';
import User from '../models/user';

export default async (req: ExpressRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({
        error: 'No token provided',
        message: 'Please provide a token in the Authorization header'
      });
      return;
    }
    const token = authHeader.split(' ')[1];
    const data = jwt.verify(token, JWT_SECRET) as { id: string, email: string };
    const user = await User.findById(data.id);
    if (!user) {
      res.status(401).json({
        error: 'No user found',
        message: 'No user found with the provided token'
      });
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(401).json({
      error: 'Unauthorized',
      message: 'Invalid token'
    });
  }
}
