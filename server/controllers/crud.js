import { wrap } from '../middleware/errorHandler.js';

const notFound = (res) => res.status(404).json({ error: 'Not found' });

// Generic CRUD handlers shared by projects, experience, skills, education, certifications.
export const crud = (Model) => ({
  list: wrap(async (_req, res) => res.json(await Model.find().sort({ order: 1, createdAt: -1 }))),
  get: wrap(async (req, res) => {
    const doc = await Model.findById(req.params.id);
    return doc ? res.json(doc) : notFound(res);
  }),
  create: wrap(async (req, res) => res.status(201).json(await Model.create(req.body))),
  update: wrap(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    return doc ? res.json(doc) : notFound(res);
  }),
  remove: wrap(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    return doc ? res.status(204).end() : notFound(res);
  }),
});
