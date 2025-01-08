import { Document } from 'mongoose';

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  repeatedPassword: string;
  newsletterConsent: boolean;
  createdAt: Date;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface UserDocument extends User, Document {
  validatePassword(param1: string): Promise<boolean>;
}
