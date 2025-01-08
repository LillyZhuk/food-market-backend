import { Request } from 'express'
import { UserDocument } from './user';

export interface ExpressRequest extends Request {
  user?: UserDocument;
}
