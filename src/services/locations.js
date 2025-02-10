import { LocationsCollection } from '../db/models/Location.js';

export const getLocations = async () => {
  const locations = await LocationsCollection.find();

  return locations;
};

export const getLocation = async (id) => {
  const location = await LocationsCollection.findById(id);

  return location;
};
