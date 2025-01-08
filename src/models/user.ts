import { model, Schema } from 'mongoose';
import bcryptjs from 'bcryptjs';

import { UserDocument, UserRole } from '../types/user';

const userSchema = new Schema<UserDocument>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    validate: {
      validator: (v: string) => /^[A-Za-z]+$/.test(v),
      message: 'First name must contain Latin letters only',
    }
  },
  lastName: {
    type: String,
    required: [true, 'Lat name is required'],
    validate: {
      validator: (v: string) => /^[A-Za-z]+$/.test(v),
      message: 'First name must contain Latin letters only',
    }
  },
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: (v: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
      message: 'Invalid email format',
    },
    unique: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: (v: string) => /^\d{13}$/.test(v),
      message: 'Phone number must contain exactly 13 digits',
    },
    unique: false
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: (v: string) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&{}()])[A-Za-z\d@$!%*?&{}()]{6,}$/.test(v),
      message: 'Password must be at least 6 characters long, contain a Latin letter, a number, and a special character',
    },
    select: false
  },
  role: {
    type: String,
    default: UserRole.USER,
  },
  newsletterConsent: {
    type: Boolean,
    required: false,
    default: false
  }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    return next();
  } catch (e) {
    return next(e as Error);
  }
})

userSchema.methods.validatePassword = function (password: string) {
  return bcryptjs.compare(password, this.password);
}

export default model<UserDocument>('User', userSchema);
