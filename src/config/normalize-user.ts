import { UserDocument } from '../types/user';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

export const normalizeUser = (user: UserDocument) => {
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
