import { ExpressRequest } from '../types/expressRequest.interface';
import { NextFunction, Response } from 'express';
import { UserRole } from '../types/user';

const roleMiddleware = (requiredRole: UserRole) => {
  return (req: ExpressRequest, res: Response, next: NextFunction) => {
      const userRole = req.user?.role;
      if (userRole !== requiredRole) {
        res.status(403).send({ error: 'Access denied' });
        return;
      }
      next();
  }
}

export default roleMiddleware;
