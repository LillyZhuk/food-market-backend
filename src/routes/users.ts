import express from 'express';
import userController from '../controllers/users';
import authMiddleware from '../middlewares/authMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';
import { UserRole } from '../types/user';

const router = express.Router();

router.get('/list', authMiddleware, roleMiddleware(UserRole.ADMIN), userController.getUsersList);
router.get('/:userId', authMiddleware, userController.getUserById);
router.delete('/:userId', authMiddleware, roleMiddleware(UserRole.USER), userController.deleteUser);
router.put('/', authMiddleware, roleMiddleware(UserRole.USER), userController.updateUser);
// router.get('/', authMiddleware, userController.currentUser);

export default router;
