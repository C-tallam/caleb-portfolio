import readline from 'node:readline';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { Admin } from '../models/index.js';
import { loginSchema } from '../validators/schemas.js';

function ask(q, hidden = false) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    if (hidden) rl._writeToOutput = (s) => { if (s.startsWith(q)) rl.output.write(q); };
    rl.question(q, (a) => { rl.close(); if (hidden) process.stdout.write('\n'); resolve(a); });
  });
}

try {
  const email = (await ask('Admin email: ')).trim();
  const password = await ask('Admin password (min 12 chars, hidden): ', true);
  loginSchema.parse({ email, password });
  if (password.length < 12) throw new Error('Password must be at least 12 characters.');

  await connectDB();
  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.findOneAndUpdate({ email: email.toLowerCase() }, { passwordHash }, { upsert: true, new: true });
  console.log(`Admin "${email}" saved. You can now log in at POST /api/auth/login`);
} catch (err) {
  console.error('Failed:', err.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
