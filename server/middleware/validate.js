export const validate = (schema) => (req, _res, next) => {
  req.body = schema.parse(req.body ?? {}); // throws ZodError, handled centrally
  next();
};

export const validId = (_req, res, next, id) =>
  /^[a-f\d]{24}$/i.test(id) ? next() : res.status(400).json({ error: 'Invalid id' });
