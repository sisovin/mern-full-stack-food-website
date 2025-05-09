import { validateUserRegistration, validateUserLogin } from '../utils/validators';

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export { validatorMiddleware, validateUserRegistration, validateUserLogin };
