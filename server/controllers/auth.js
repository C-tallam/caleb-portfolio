import bcrypt from 'bcryptjs';
import { Admin } from '../models/index.js';
import { signToken } from '../middleware/auth.js';
import { wrap } from '../middleware/errorHandler.js';

// Compared against when the email is unknown, so response time doesn't reveal valid emails.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 10);

export const login = wrap(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email }).select('+passwordHash');
  const ok = await bcrypt.compare(password, admin ? admin.passwordHash : DUMMY_HASH);
  if (!admin || !ok) return res.status(401).json({ error: 'Invalid email or password' });
  return res.json({ token: signToken(admin), admin: { id: admin.id, email: admin.email } });
});

export const me = (req, res) => res.json({ id: req.admin.id, email: req.admin.email });
