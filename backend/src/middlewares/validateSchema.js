export const validate = (schema) => (req, res, next) => {
  try {
    const validatedData = schema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (err) {
    return res.status(400).json({ message: err.errors[0].message });
  }
};
