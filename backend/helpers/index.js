import fs from 'fs';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

// import jsonFile from './databank_hwa.json' assert { type: 'json' };
import jsonFile from './hws_removed_empty_fields.json' assert { type: 'json' };
import { WaterSample } from '../models/waterSampleModel.js';

const username = encodeURIComponent('fadambrad');
const password = encodeURIComponent('ZpQkT3TreH3Y9c0R');

// mongodb+srv://fadambrad:ZpQkT3TreH3Y9c0R@cluster0.hzdku2o.mongodb.net/
const mongoUrl = `mongodb+srv://${username}:${password}@cluster0.hzdku2o.mongodb.net/?retryWrites=true&w=majority`;
const dbName = 'HWA-Water-Sample-DB';
const collectionName = 'water_sample';

const transformData = (input, idx) => {
  // Extract location details
  const latitude = input.Latitude ? parseFloat(input.Latitude) : '';
  const longitude = input.Longitude ? parseFloat(input.Longitude) : '';

  // Initialize elementsTested array
  let elementsTested = [];

  // Loop through the keys of the input object to build element results
  for (const key in input) {
    const value = input[key];

    // Check if the property can be considered an element
    if (key.includes('_') && typeof value !== 'undefined' && value !== null) {
      elementsTested.push({
        elementName: key,
        description: '',
        value: value,
      });
    }
  }

  // Build project information
  const project = {
    projectName: input.Organization + ' - ' + input.Year, // Assuming projectName is combination of Organization and Year
    organization: input.Organization,
    labName: input.LabName,
    labId: input.LabID,
  };
  // Create the transformed water sample object
  const transformedSample = {
    location: {
      type: 'Point',
      coordinates: [latitude, longitude],
      county: input.County,
      elevation: input.Elevation,
      elevationToGrade: input.ElevationToGrade,
      locationDesc: input.LocationDesc,
    },
    elementsTested: elementsTested,
    eventId: input.EventID,
    matrix: input.Matrix,
    project: project,
    sampleComment: input.SampleComment,
    sampleDate: new Date(input.SampleDate),
    sampleNumber: input.SampleNumber,
    sampleTime: input.SampleTime,
    sampleType: input.SampleType,
    sampler: input.Sampler,
    stationName: input.StationName,
    stationNameTwo: input.StationName2,
    waterBody: input.WaterBody,
    waterBodyId: input.WaterBodyId,
    waterCode: input.WaterCode,
    watershed: input.Watershed,
    watershedReport: input.Watershed,
  };

  return transformedSample;
};

async function main() {
  try {
    const modelShapedHwaJson = jsonFile.map((o) => transformData(o));
    await WaterSample.insertMany(modelShapedHwaJson);
    console.log('Payload WaterSamples uploaded successfully');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// main();

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
};

export { errorHandler };
