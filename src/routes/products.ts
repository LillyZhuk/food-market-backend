import express from 'express';
import productController from '../controllers/products';
import roleMiddleware from '../middlewares/roleMiddleware';
import { UserRole } from '../types/user';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/favorites', authMiddleware, productController.addToFavorites);
router.get('/favorites', authMiddleware, productController.getFavoriteProductsByUser);
router.delete('/favorites', authMiddleware, productController.removeProductFromFavorites);
router.get('/', productController.getAllProducts);
router.post('/', authMiddleware, roleMiddleware(UserRole.ADMIN), productController.createProduct);
router.get('/:id', productController.getProductById);

export default router;
