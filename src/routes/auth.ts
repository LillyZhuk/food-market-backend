import authController from '../controllers/auth';
import router from './users';

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/check-user', authController.checkUserByEmail);
router.post('/reset-password', authController.resetPassword);

export default router;
