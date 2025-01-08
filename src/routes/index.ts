import express from 'express';
import cors from 'cors';

import userRouter from './users'
import productRouter from './products';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res, next) => {
  res.send(`<p>Backend works correct</p>`)
});

router.use('/api/users', userRouter);
router.use('/api/products', productRouter);

export default router;
