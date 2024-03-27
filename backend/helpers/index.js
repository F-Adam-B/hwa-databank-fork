import fs from 'fs';
import { MongoClient } from 'mongodb';
import mongoose, { model } from 'mongoose';

// import jsonFile from './databank_hwa.json' assert { type: 'json' };
import jsonFile from './hws_removed_empty_fields.json' assert { type: 'json' };
import charJsonFile from './characteristicJSON.json' assert { type: 'json' };
import transformedAnalytesAndChars from './transformedAnalytesAndChars.json' assert { type: 'json' };
import modelShapedHwaDataSet from './modelShapedHwaDataSet.json' assert { type: 'json' };
import fullyTransformedDataSet from './fullyTransformedDataSet.json' assert { type: 'json' };

import { WaterSample } from '../models/waterSampleModel.js';
import { Analytes } from '../models/analyteModel.js';

const username = encodeURIComponent('fadambrad');
const password = encodeURIComponent('ZpQkT3TreH3Y9c0R');

// mongodb+srv://fadambrad:ZpQkT3TreH3Y9c0R@cluster0.hzdku2o.mongodb.net/
const mongoUrl = `mongodb+srv://${username}:${password}@cluster0.hzdku2o.mongodb.net/?retryWrites=true&w=majority`;
const dbName = 'HWA-Water-Sample-DB';
const collectionName = 'water_sample';

// used to reshape analyte characteristics
const transformCharsJson = (input) => {
  return input.reduce((accumulator, currentValue) => {
    let analyteEntry = accumulator.find(
      (entry) => entry.analyteName === currentValue.FIELD3
    );

    // If no such entry exists, create one
    if (!analyteEntry) {
      analyteEntry = {
        analyteName: currentValue.FIELD3,
        characteristics: [],
      };

      accumulator.push(analyteEntry);
    }

    // Add characteristic to the analyte entry
    analyteEntry.characteristics.push({
      name: currentValue.FIELD4,
      description: currentValue.FIELD5,
    });

    return accumulator;
  }, []);
};

// const transformedChars = JSON.stringify(transformCharsJson(charJsonFile));

// use with hws_removed_empty_fields.json
const transformData = (input, idx) => {
  // Extract location details
  const latitude = input.Latitude ? parseFloat(input.Latitude) : '';
  const longitude = input.Longitude ? parseFloat(input.Longitude) : '';

  // Initialize analytesTested array
  let analytesTested = [];

  // Loop through the keys of the input object to build element results
  for (const key in input) {
    const value = input[key];

    // Check if the property can be considered an element
    if (key.includes('_') && typeof value !== 'undefined' && value !== null) {
      analytesTested.push({
        elementName: key,
        description: '',
        value: value,
      });
    }
  }

  // Build project information
  const project = {
    projectName: input.ProjectName, // Assuming projectName is combination of Organization and Year
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
      locationDescription: input.LocationDesc,
    },
    analytesTested: analytesTested,
    eventId: input.EventID,
    matrix: input.Matrix,
    project: project,
    sampleComment: input.SampleComment,
    sampleDate: new Date(input.SampleDate),
    sampleNumber: input.SampleNumber,
    sampleTime: input.SampleTime,
    sampleType: input.SampleType,
    sampler: input.Sampler,
    stationNameOne: input.StationName,
    stationNameTwo: input.StationName2,
    sampleTag1: input.Sampletag1,
    sampleTag2: input.Sampletag2,
    sampleTag3: input.Sampletag3,
    sampleTag4: input.Sampletag4,
    sampleTag5: input.Sampletag5,
    waterBody: input.WaterBody,
    waterBodyId: input.WaterBodyId,
    waterCode: input.WaterCode,
    watershed: input.Watershed,
    watershedReport: input.Watershed,
  };

  return transformedSample;
};

const reshapeAnalytes = (analytes, reference) => {
  return reference
    .map((refAna) => {
      const filteredCharacteristics = refAna.characteristics
        .map((char) => {
          // Find the matching analyte by elementName
          const foundAnalyte = analytes.find(
            (a) => a.elementName === char.name
          );
          if (foundAnalyte) {
            // If an analyte is found, return an object with the needed properties
            return {
              name: foundAnalyte.elementName,
              description: char.description,
              value: foundAnalyte.value,
            };
          }
          return null; // Return null if no analyte is found
        })
        .filter((item) => item !== null); // Filter out the null entries

      if (filteredCharacteristics.length > 0) {
        return {
          analyteName: refAna.analyteName,
          characteristics: filteredCharacteristics,
        };
      }
      return null;
    })
    .filter(Boolean);
};

const transformedAnalytesTestedValues = (dataSet) => {
  return dataSet.map((sample, idx) => {
    const { analytesTested } = sample;

    const reshapedAnalytes = reshapeAnalytes(
      analytesTested,
      transformedAnalytesAndChars
    );
    return {
      ...sample,
      analytesTested: reshapedAnalytes,
    };
  });
};

// fs.writeFile(
//   'fullyTransformedDataSet.json',
//   JSON.stringify(fullyTransformedDataSet),
//   'utf-8',
//   (err) => {
//     if (err) {
//       console.log(err);
//     }

//     console.log('Success!!!');
//   }
// );

export const main = async () => {
  try {
    await WaterSample.insertMany(fullyTransformedDataSet);
    console.log('Payload WaterSamples uploaded successfully');
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// main();

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
};

export { errorHandler };
