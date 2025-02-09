import * as observationsServices from '../services/observations.js';

export const getObservationsController = async (req, res) => {
  const { _id: userId } = req.user;
  const observations = await observationsServices.getObservations(userId);

  res.json({
    status: 200,
    message: 'Successfully found observations!',
    observations,
  });
};

export const addObservationController = async (req, res) => {
  const { _id: userId } = req.user;
  console.log(userId);

  const data = await observationsServices.addObservation({
    ...req.body,
    userId,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a observation!',
    data,
  });
};
