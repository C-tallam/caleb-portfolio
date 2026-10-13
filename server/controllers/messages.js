import { Message } from '../models/index.js';
import { wrap } from '../middleware/errorHandler.js';

export const createMessage = wrap(async (req, res) => {
  const { website, ...data } = req.body;
  // Honeypot filled in = bot. Pretend success, store nothing.
  if (website) return res.status(201).json({ ok: true });
  await Message.create(data);
  return res.status(201).json({ ok: true, message: 'Message received. Thank you!' });
});

export const listMessages = wrap(async (_req, res) =>
  res.json(await Message.find().sort({ createdAt: -1 }).limit(200)));

export const setRead = wrap(async (req, res) => {
  const doc = await Message.findByIdAndUpdate(req.params.id, { read: req.body.read }, { new: true });
  return doc ? res.json(doc) : res.status(404).json({ error: 'Not found' });
});

export const removeMessage = wrap(async (req, res) => {
  const doc = await Message.findByIdAndDelete(req.params.id);
  return doc ? res.status(204).end() : res.status(404).json({ error: 'Not found' });
});
