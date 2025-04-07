import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import { spawn } from 'child_process';

import routes from './routes';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Food market documentation API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/swagger-docs/*.ts'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

mongoose.set('toJSON', {
  virtuals: true,
  transform: (_, converted) => {
    delete converted._id;
  }
})

const PORT = process.env.PORT || 8080;

app.use(routes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/foodmarketdb')
  .then(() => {
    console.log('MongoDB connected!');

    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);

      const url = `http://localhost:${PORT}/api/docs`;
      const command = process.platform === 'win32' ? 'start' : 'open';

      spawn(command, [url], { stdio: 'ignore', detached: true }).unref();
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
