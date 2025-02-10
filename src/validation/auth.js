import Joi from 'joi';

import { emailRegexp } from '../constants/auth.js';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(2).max(32).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).max(64).required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(32).optional(),
  email: Joi.string().pattern(emailRegexp).optional(),
  password: Joi.string().min(8).max(64).optional(),
  locationId: Joi.string().optional(),
});
