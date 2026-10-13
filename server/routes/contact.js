import { Router } from 'express';
import { createMessage, listMessages, setRead, removeMessage } from '../controllers/messages.js';
import { requireAdmin } from '../middleware/auth.js';
import { contactLimiter } from '../middleware/rateLimit.js';
import { validate, validId } from '../middleware/validate.js';
import { contactSchema, readSchema } from '../validators/schemas.js';

const router = Router();
router.param('id', validId);

// Public: visitors send a message
router.post('/contact', contactLimiter, validate(contactSchema), createMessage);

// Admin: read and manage messages
router.get('/messages', requireAdmin, listMessages);
router.patch('/messages/:id', requireAdmin, validate(readSchema), setRead);
router.delete('/messages/:id', requireAdmin, removeMessage);

export default router;
