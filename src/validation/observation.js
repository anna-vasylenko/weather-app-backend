import Joi from 'joi';

const now = new Date();

export const createObservationSchema = Joi.object({
  locationId: Joi.string().required().messages({
    'string.base': '"locationId" must be a string',
    'any.required': 'Missing required field "locationId"',
  }),
  time: Joi.date().max(now).required().messages({
    'date.base': '"time" must be a valid date',
    'date.max': '"time" cannot be in the future',
    'any.required': 'Missing required field "time"',
  }),
  temperature: Joi.number().required().messages({
    'number.base': '"temperature" must be a number',
    'any.required': 'Missing required field "temperature"',
  }),
  humidity: Joi.number().messages({
    'number.base': '"humidity" must be a number',
  }),
  precipitation: Joi.number().messages({
    'number.base': '"precipitation" must be a number',
  }),
  windSpeed: Joi.number().messages({
    'number.base': '"windSpeed" must be a number',
  }),
  windDirection: Joi.number().messages({
    'number.base': '"windDirection" must be a number',
  }),
});
