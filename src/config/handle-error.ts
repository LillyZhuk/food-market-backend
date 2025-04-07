import { Response } from 'express';
import mongoose from 'mongoose';

export const handleErrors = (err: any, res: Response) => {
  if (err instanceof mongoose.Error.ValidationError) {
    const error = Object.values(err.errors).map((e: any) => e.message)[0];
    res.status(500).json({
      error: 'Validation error',
      message: error,
    });
  } else if (err.code === 11000) {
    // Handling duplicate key error
    const field = Object.keys(err.keyPattern)[0];
    res.status(400).json({
      error: 'Duplicate key error',
      message: `${field} already in use`
    });
  } else {
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong. Please try again later.'
    });
  }
};
