import { Router } from 'express';
import { login, me } from '../controllers/auth.js';
import { requireAdmin } from '../middleware/auth.js';
import { loginLimiter } from '../middleware/rateLimit.js';
import { validate } from '../middleware/validate.js';
import { loginSchema } from '../validators/schemas.js';

const router = Router();
router.post('/login', loginLimiter, validate(loginSchema), login);
router.get('/me', requireAdmin, me);
export default router;
