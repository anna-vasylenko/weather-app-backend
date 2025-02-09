import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import * as locationController from '../controllers/locations.js';

const locationsRouter = Router();

locationsRouter.use(authenticate);

locationsRouter.get(
  '/',
  ctrlWrapper(locationController.getLocationsController),
);

export default locationsRouter;
