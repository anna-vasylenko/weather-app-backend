import * as locationsServices from '../services/locations.js';

export const getLocationsController = async (req, res) => {
  const locations = await locationsServices.getLocations();
  res.json({
    status: 200,
    message: 'Successfully found locations!',
    locations,
  });
};
