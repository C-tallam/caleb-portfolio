import { ZodError } from 'zod';
import { env } from '../config/env.js';

export const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

export const notFound = (_req, res) => res.status(404).json({ error: 'Route not found' });

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
    });
  }
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON body' });
  if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Request body too large' });
  if (err.name === 'CastError' || err.name === 'ValidationError') return res.status(400).json({ error: 'Invalid data' });
  if (err.code === 11000) return res.status(409).json({ error: 'Already exists' });
  if (err.status && err.status < 500) return res.status(err.status).json({ error: err.message });

  console.error(err);
  return res.status(500).json({ error: env.isProd ? 'Something went wrong' : err.message });
}
