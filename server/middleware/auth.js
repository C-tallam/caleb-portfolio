import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { Admin } from '../models/index.js';
import { wrap } from './errorHandler.js';

export const signToken = (admin) =>
  jwt.sign({ sub: admin.id }, env.jwtSecret, { algorithm: 'HS256', expiresIn: env.jwtExpires });

export const requireAdmin = wrap(async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  try {
    const payload = jwt.verify(token, env.jwtSecret, { algorithms: ['HS256'] });
    const admin = await Admin.findById(payload.sub);
    if (!admin) return res.status(401).json({ error: 'Invalid or expired token' });
    req.admin = admin;
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
});
