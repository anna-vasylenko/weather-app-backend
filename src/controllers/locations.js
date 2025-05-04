import createHttpError from 'http-errors';
import * as locationsServices from '../services/locations.js';
import * as authServices from '../services/auth.js';

export const getLocationsController = async (req, res) => {
  const locations = await locationsServices.getLocations();

  res.json({
    status: 200,
    message: 'Successfully found locations!',
    locations,
  });
};

export const getLocationController = async (req, res, next) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;

  const data = await locationsServices.getLocation({ _id });

  if (!data) {
    next(createHttpError(404, `Location with id ${_id} not found!`));
    return;
  }

  await authServices.updateUserLocation(userId, _id);

  res.json({
    status: 200,
    message: `Successfully found location with id ${_id}!`,
    data,
  });
};

export const getLocationInfoController = async (req, res, next) => {
  const { id: _id } = req.params;
  const data = await locationsServices.getLocation({ _id });

  if (!data) {
    next(createHttpError(404, `Location with id ${_id} not found!`));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found location with id ${_id}!`,
    data,
  });
};
