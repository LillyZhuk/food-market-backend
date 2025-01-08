import express from 'express';
import mongoose from 'mongoose';

import routes from './routes';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

mongoose.set('toJSON', {
  virtuals: true,
  transform: (_, converted) => {
    delete converted._id;
  }
})

const PORT = process.env.PORT || 8080;
app.use(routes);

// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase')
//   .then(
//     () => {
//       console.log('MongoDB connected!');
//       app.listen(PORT, () => {
//         console.log(`Listening on ${PORT}`);
//       })
//     }
//   )
//   .catch(err => console.error('MongoDB connection error:', err));
//
// export default () => {
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  })
// }
