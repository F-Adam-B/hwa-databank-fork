import mongoose, { Schema } from 'mongoose';

// Define a schema for element results
const variableSchema = new Schema({
  variableName: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  value: {
    type: Schema.Types.Mixed,
    required: true
  }
}, { _id : false });

const locationSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
    // The coordinates array should contain longitude first, then latitude
  coordinates: {
    type: [Number],
    required: true
  }
})

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
    unique: true
  },
  county: {
    type: String,
  },
  organization: {
    type: String,
    required: true
  }
})

// Define a schema for the water sample
const waterSampleSchema = new Schema({
  location: {
    type: locationSchema,
    index: '2dsphere'
  },
  elementsTested: [variableSchema],
  project: [projectSchema],
  matrix: {
    type: String,
    required: true,
  },
  sampleDate: {
    type: Date,
    default: Date.now
  },
  sampleNumber : {
    type: String,
    required: true,
    unique: true
  },
  sampleTime: {
    type: String,
  },
  sampler: {
    type: String,
  },
  stationName: {
    type: String,
    required: true  
  },
});

// Create a model using the schema
export const WaterSample = mongoose.model('WaterSample', waterSampleSchema);

