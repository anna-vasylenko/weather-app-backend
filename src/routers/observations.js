import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import * as observationsController from '../controllers/observations.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createObservationSchema } from '../validation/observation.js';

const observationsRouter = Router();

observationsRouter.use(authenticate);

observationsRouter.get(
  '/',
  ctrlWrapper(observationsController.getObservationsController),
);

observationsRouter.post(
  '/',
  validateBody(createObservationSchema),
  ctrlWrapper(observationsController.addObservationController),
);

export default observationsRouter;
