import mongoose from 'mongoose';

const options = {
  timestamps: true,
  toJSON: {
    versionKey: false,
    transform: (_doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.passwordHash;
      return ret;
    },
  },
};
const make = (name, fields) => mongoose.model(name, new mongoose.Schema(fields, options));
const str = (extra = {}) => ({ type: String, trim: true, default: '', ...extra });
const order = { type: Number, default: 0 };

export const Project = make('Project', {
  name: str({ required: true }), description: str({ required: true }),
  technologies: [String], github: str(), demo: str(), image: str(), imageAlt: str(),
  date: str(), category: str(), order,
});
export const Experience = make('Experience', {
  organization: str({ required: true }), type: str(), department: str(), location: str(),
  start: str({ required: true }), end: str(), description: str(),
  focusAreas: [String], responsibilities: [String], technologies: [String], order,
});
export const Skill = make('Skill', { title: str({ required: true }), icon: str({ default: 'code' }), items: [String], order });
export const Education = make('Education', {
  qualification: str({ required: true }), institution: str({ required: true }),
  location: str(), period: str(), details: str(), order,
});
export const Certification = make('Certification', {
  name: str({ required: true }), issuer: str(), date: str(), url: str(), order,
});
export const Message = make('Message', {
  name: str({ required: true }), email: str({ required: true }), subject: str(),
  message: str({ required: true }), read: { type: Boolean, default: false },
});
export const Admin = make('Admin', {
  email: str({ required: true, unique: true, lowercase: true }),
  passwordHash: { type: String, required: true, select: false },
});
