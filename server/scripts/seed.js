// Copies the content from client/src/data/portfolioData.js into MongoDB (only into EMPTY collections).
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import * as models from '../models/index.js';
import * as s from '../validators/schemas.js';
import * as data from '../../client/src/data/portfolioData.js';

const plan = [
  ['projects', models.Project, s.projectSchema, data.projects],
  ['experience', models.Experience, s.experienceSchema, data.experience],
  ['skills', models.Skill, s.skillSchema, data.skills],
  ['education', models.Education, s.educationSchema, data.education],
  ['certifications', models.Certification, s.certificationSchema, data.certifications],
];

try {
  await connectDB();
  for (const [name, Model, schema, items] of plan) {
    if (await Model.countDocuments()) { console.log(`- ${name}: already has data, skipped`); continue; }
    if (!items.length) { console.log(`- ${name}: nothing to seed`); continue; }
    await Model.insertMany(items.map((item, i) => schema.parse({ ...item, order: i })));
    console.log(`- ${name}: seeded ${items.length}`);
  }
} catch (err) {
  console.error('Seed failed:', err.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
