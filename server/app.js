import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { env } from './config/env.js';
import { apiLimiter } from './middleware/rateLimit.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import contentRoutes from './routes/content.js';
import contactRoutes from './routes/contact.js';
import authRoutes from './routes/auth.js';

const app = express();
app.set('trust proxy', 1); // correct client IPs behind Render/Railway proxies (needed for rate limiting)
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({
  origin(origin, cb) {
    if (!origin || env.clientUrls.includes(origin)) return cb(null, true);
    const err = new Error('Origin not allowed by CORS');
    err.status = 403;
    return cb(err);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({ status: 'ok', database: connected ? 'connected' : 'disconnected' });
});

app.use('/api', apiLimiter);
app.use('/api/auth', authRoutes);
app.use('/api', contactRoutes);
app.use('/api', contentRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
