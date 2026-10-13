import { z } from 'zod';

const text = (max, min = 0) => z.string().trim().min(min).max(max);
const opt = (max) => text(max).default('');
const url = z.string().trim().max(500)
  .refine((v) => v === '' || /^https?:\/\/\S+$/i.test(v), 'Must start with http:// or https://')
  .default('');
const list = (max = 60) => z.array(text(max, 1)).max(40).default([]);
const order = z.number().int().min(0).max(10000).default(0);

export const ICONS = ['code', 'network', 'wrench', 'palette', 'terminal', 'layers', 'shield', 'cpu', 'server', 'rocket', 'graduation', 'briefcase', 'award', 'folder'];

export const projectSchema = z.object({
  name: text(120, 1), description: text(2000, 1), technologies: list(), github: url, demo: url,
  image: url, imageAlt: opt(200), date: opt(40), category: opt(60), order,
});
export const experienceSchema = z.object({
  organization: text(160, 1), type: opt(60), department: opt(100), location: opt(120),
  start: text(40, 1), end: opt(40), description: opt(2000),
  focusAreas: list(), responsibilities: list(300), technologies: list(), order,
});
export const skillSchema = z.object({ title: text(80, 1), icon: z.enum(ICONS).default('code'), items: list(), order });
export const educationSchema = z.object({
  qualification: text(160, 1), institution: text(160, 1), location: opt(120),
  period: opt(60), details: opt(1000), order,
});
export const certificationSchema = z.object({ name: text(160, 1), issuer: opt(160), date: opt(40), url, order });

export const contactSchema = z.object({
  name: text(100, 2),
  email: z.string().trim().toLowerCase().email().max(254),
  subject: opt(150),
  message: text(3000, 10),
  website: z.string().max(200).optional(), // honeypot: real users leave this empty
});
export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(1).max(200),
});
export const readSchema = z.object({ read: z.boolean() });
