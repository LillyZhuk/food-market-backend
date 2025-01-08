import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { ExpressRequest } from '../types/expressRequest.interface';
import { JWT_SECRET } from '../config/config';
import User from '../models/user';

export default async (req: ExpressRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }
    const token = authHeader.split(' ')[1];
    const data = jwt.verify(token, JWT_SECRET) as { id: string, email: string };
    const user = await User.findById(data.id);
    if (!user) {
      res.status(401).json({ error: 'No user found' });
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(401).json({ error: 'Unauthorized' });
  }
}
