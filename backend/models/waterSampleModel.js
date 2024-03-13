import mongoose from 'mongoose';

const { Schema } = mongoose;

import { analyteSchema } from './analyteModel.js';
// Common field type options
export const requiredString = {
  type: String,
  required: true,
};

export const uniqueString = {
  type: String,
  unique: true,
};

// Schema for location
const isValidLongitude = (lon) => isFinite(lon) && lon >= -180 && lon <= 180;
const isValidLatitude = (lat) => isFinite(lat) && lat >= -90 && lat <= 90;

const pointValidator = function (value) {
  // Check if it's an array with two empty strings or a pair of valid latitude and longitude numbers
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    (value.every((coord) => coord === '') ||
      (isValidLatitude(value[1]) && isValidLongitude(value[0])))
  );
};
const locationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    // The coordinates array should contain latitude (lat), then longitude (long)
    coordinates: {
      type: [Number],
      default: ['', ''],
    },
    county: String,
    elevation: Number,
    elevationToGrade: Number,
    locationDescription: String,
  },
  {
    _id: false,
    index: { type: '2dsphere', sparse: true }, // Sparse index for better performance on large datasets
  }
);

// Schema for project
const projectSchema = new Schema(
  {
    labId: String,
    labName: String,
    projectName: String,
    organization: String,
  },
  {
    _id: false,
  }
);

// Schema for tags
const tagsSchema = new Schema(
  {
    sampletag1: String,
    sampletag2: String,
    sampletag3: String,
    sampletag4: String,
    sampletag5: String,
  },
  { _id: false }
);

const analytesTestedType = new Schema(
  {
    ...analyteSchema.obj,
    value: String,
  },
  { _id: false }
);
// Define the main schema for the water sample
const waterSampleSchema = new Schema(
  {
    analytesTested: [analytesTestedType],
    dateCollected: String,
    eventId: String,
    location: locationSchema,
    matrix: String,
    project: projectSchema,
    sampleComment: String,
    sampleDate: {
      type: Date,
      default: Date.now,
    },
    sampleNumber: uniqueString,
    sampler: String,
    sampleTags: tagsSchema,
    sampleTime: String,
    sampleType: String,
    stationName: String,
    stationNameTwo: String,
    timeCollected: String,
    waterBody: String,
    waterBodyId: String,
    waterCode: String,
    watershed: String,
    watershedReport: String,
  },
  { timestamps: true }
);

// Create a model using the schema
export const WaterSample = mongoose.model(
  'WaterSample',
  waterSampleSchema,
  'hwa-databank'
);
