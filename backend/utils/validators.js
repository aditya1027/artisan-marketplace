import { body, validationResult } from 'express-validator';

export const validateProduct = [
  body('name').trim().isLength({ min: 2 }).escape(),
  body('description').trim().isLength({ min: 10 }).escape(),
  body('price').isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
