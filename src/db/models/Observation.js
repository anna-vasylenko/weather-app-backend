import { Schema, model } from 'mongoose';

const observationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    locationId: {
      type: Schema.Types.ObjectId,
      ref: 'location',
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
    },
    precipitation: {
      type: Number,
    },
    windSpeed: {
      type: Number,
    },
    windDirection: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ObservationsCollection = model('observation', observationSchema);

export default ObservationsCollection;
