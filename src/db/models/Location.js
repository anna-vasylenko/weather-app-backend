import { model, Schema } from 'mongoose';

const locationsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const LocationsCollection = model('location', locationsSchema);
