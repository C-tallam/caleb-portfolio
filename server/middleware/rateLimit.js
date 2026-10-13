import rateLimit from 'express-rate-limit';

const make = (windowMs, limit, error) =>
  rateLimit({ windowMs, limit, standardHeaders: true, legacyHeaders: false, message: { error } });

export const apiLimiter = make(15 * 60 * 1000, 300, 'Too many requests, please try again later.');
export const contactLimiter = make(60 * 60 * 1000, 5, 'Too many messages sent. Please try again in an hour.');
export const loginLimiter = make(15 * 60 * 1000, 10, 'Too many login attempts. Please try again later.');
