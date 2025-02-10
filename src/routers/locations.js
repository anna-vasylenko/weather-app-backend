import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import * as locationController from '../controllers/locations.js';
import { isValidId } from '../middlewares/isValidId.js';

const locationsRouter = Router();

locationsRouter.use(authenticate);

locationsRouter.get(
  '/',
  ctrlWrapper(locationController.getLocationsController),
);

locationsRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(locationController.getLocationController),
);

export default locationsRouter;
