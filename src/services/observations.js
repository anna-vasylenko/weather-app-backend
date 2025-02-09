import ObservationsCollection from '../db/models/Observation.js';

export const getObservations = async (userId) => {
  const filter = { userId };
  const observations = await ObservationsCollection.find(filter);

  return observations;
};

export const addObservation = async (payload) => {
  const newObservation = await ObservationsCollection.create(payload);

  return newObservation;
};
