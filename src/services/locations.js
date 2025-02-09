import { LocationsCollection } from '../db/models/Location.js';

export const getLocations = async () => {
  const locations = await LocationsCollection.find();

  return locations;
};
