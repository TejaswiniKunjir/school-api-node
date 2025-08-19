import { body, query } from 'express-validator';

export const addSchoolValidation = [
  body('name').isString().trim().notEmpty().withMessage('name is required'),
  body('address').isString().trim().notEmpty().withMessage('address is required'),
  body('latitude')
    .exists().withMessage('latitude is required')
    .isFloat({ min: -90, max: 90 }).withMessage('latitude must be between -90 and 90'),
  body('longitude')
    .exists().withMessage('longitude is required')
    .isFloat({ min: -180, max: 180 }).withMessage('longitude must be between -180 and 180'),
];

export const listSchoolsValidation = [
  query('lat')
    .exists().withMessage('lat is required')
    .isFloat({ min: -90, max: 90 }).withMessage('lat must be between -90 and 90'),
  query('lng')
    .exists().withMessage('lng is required')
    .isFloat({ min: -180, max: 180 }).withMessage('lng must be between -180 and 180'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 1000 }).withMessage('limit must be an integer between 1 and 1000'),
];
