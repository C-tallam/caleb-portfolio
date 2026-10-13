import { Router } from 'express';
import { crud } from '../controllers/crud.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate, validId } from '../middleware/validate.js';
import { Project, Experience, Skill, Education, Certification } from '../models/index.js';
import {
  projectSchema, experienceSchema, skillSchema, educationSchema, certificationSchema,
} from '../validators/schemas.js';

const resources = {
  projects: [Project, projectSchema],
  experience: [Experience, experienceSchema],
  skills: [Skill, skillSchema],
  education: [Education, educationSchema],
  certifications: [Certification, certificationSchema],
};

const router = Router();
for (const [path, [Model, schema]] of Object.entries(resources)) {
  const c = crud(Model);
  const r = Router();
  r.param('id', validId);
  // Public, read-only
  r.get('/', (_req, res, next) => { res.set('Cache-Control', 'public, max-age=30'); next(); }, c.list);
  r.get('/:id', c.get);
  // Admin only
  r.post('/', requireAdmin, validate(schema), c.create);
  r.put('/:id', requireAdmin, validate(schema), c.update);
  r.delete('/:id', requireAdmin, c.remove);
  router.use(`/${path}`, r);
}
export default router;
