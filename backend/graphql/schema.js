import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLScalarType,
  GraphQLInputObjectType,
  GraphQLFloat,
} from 'graphql';

import { WaterSample } from '../models/waterSampleModel.js';
import { Analytes } from '../models/analyteModel.js';
import { SampleFormValuesInputType } from './inputTypes.js';
import {
  AnalyteType,
  FormFieldType,
  SampleType,
  GraphQLDate,
} from './types.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    formFieldValues: {
      type: FormFieldType,
      resolve: async (parent, args) => {
        try {
          const result = await WaterSample.aggregate([
            {
              $group: {
                _id: null, // Group by null to aggregate over the whole collection
                uniqueStationNames: { $addToSet: '$stationName' },
                uniqueOrganizations: { $addToSet: '$project.organization' },
                uniqueMatrices: { $addToSet: '$matrix' },
                uniqueWaterBodies: { $addToSet: '$waterBody' },
                // Add other fields here as needed
              },
            },
            {
              $project: {
                _id: 0, // Exclude the _id field from results
                uniqueStationNames: 1,
                uniqueOrganizations: 1,
                uniqueMatrices: 1,
                uniqueWaterBodies: 1,
                // Include other fields here as needed
              },
            },
          ]);

          if (result.length > 0) {
            return result[0];
          } else {
            console.log('No unique values found.');
            return {}; // Optionally return an empty object or any other appropriate value
          }
        } catch (error) {
          console.error('Error fetching distinct values:', error);
          throw new Error('Error fetching distinct values'); // Propagate the error up to GraphQL
        }
      },
    },
    samples: {
      type: new GraphQLList(SampleType),
      resolve(parent, args) {
        return WaterSample.find({
          'location.coordinates': { $ne: [null, null] },
        });
      },
    },
    sample: {
      type: new GraphQLList(SampleType),
      args: {
        matrix: { type: GraphQLString },
        stationName: { type: GraphQLString },
        organization: { type: GraphQLString },
        fromDate: { type: GraphQLDate },
        toDate: { type: GraphQLDate },
        waterBody: { type: GraphQLString },
        analytes: { type: GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        const {
          analytes,
          matrix,
          stationName,
          organization,
          fromDate,
          toDate,
          waterBody,
        } = args;

        // Create a filter object based on provided arguments
        const queryFilter = {
          'location.coordinates': { $exists: true, $ne: null },
        };
        if (matrix) queryFilter.matrix = matrix;
        if (stationName) queryFilter.stationName = stationName;
        if (organization) queryFilter['project.organization'] = organization;
        if (analytes.length > 0)
          queryFilter['analytesTested.analyteName'] = { $in: analytes };
        if (fromDate && toDate) {
          queryFilter.sampleDate = { $gte: fromDate, $lte: toDate };
        } else if (fromDate) {
          queryFilter.sampleDate = { $gte: fromDate };
        } else if (toDate) {
          queryFilter.sampleDate = { $lte: toDate };
        }
        if (waterBody) queryFilter.waterBody = waterBody;
        // Return the filtered water samples

        return WaterSample.find(queryFilter);
      },
    },
    analytes: {
      type: new GraphQLList(AnalyteType),
      resolve(parent, args) {
        return Analytes.find();
      },
    },
    analytesCharacteristics: {
      type: new GraphQLList(AnalyteType),
      args: {
        listOfAnalyteNames: { type: GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        const { listOfAnalyteNames } = args;
        const analyteCharQueryFilter = { analyteName: listOfAnalyteNames };

        return Analytes.find(analyteCharQueryFilter);
      },
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    addSampleMutation: {
      type: SampleType,
      args: {
        sampleFormValues: {
          type: new GraphQLNonNull(SampleFormValuesInputType),
        },
      },
      resolve: async (parent, args) => {
        try {
          const newSample = new WaterSample(args.sampleFormValues);
          const response = await newSample.save();

          return response;
        } catch (error) {
          console.error('Error adding sample to database', error);
          return new Error(error);
        }
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
