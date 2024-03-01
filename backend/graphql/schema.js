import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLScalarType,
} from 'graphql';

import { WaterSample } from '../models/waterSampleModel.js';
import { Analytes } from '../models/analyteModel.js';

const GraphQLDate = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.toISOString(); // Convert outgoing Date to ISO string
  },
  parseValue(value) {
    return new Date(value); // Convert incoming ISO string to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // Convert AST literal to Date
    }
    return null;
  },
});

const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: () => ({
    coordinates: {
      type: GraphQLList(GraphQLString),
    },
    county: { type: GraphQLString },
    elevation: { type: GraphQLString },
    elevationToGrade: { type: GraphQLString },
    locationDesc: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    projectName: { type: GraphQLString },
    organization: { type: GraphQLString },
    labName: { type: GraphQLString },
    labId: { type: GraphQLString },
  }),
});

const CharacteristicType = new GraphQLObjectType({
  name: 'Characteristic',
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    value: { type: GraphQLString },
  }),
});

const AnalyteType = new GraphQLObjectType({
  name: 'Analyte',
  fields: () => ({
    analyteName: { type: GraphQLString },
    characteristics: { type: new GraphQLList(CharacteristicType) },
  }),
});

const SampleType = new GraphQLObjectType({
  name: 'Sample',
  fields: () => ({
    id: { type: GraphQLID },
    analytesTested: { type: new GraphQLList(AnalyteType) },
    eventId: { type: GraphQLString },
    location: { type: LocationType },
    matrix: { type: GraphQLString },
    project: { type: ProjectType },
    sampleComment: { type: GraphQLString },
    sampleDate: { type: GraphQLDate },
    sampleNumber: { type: GraphQLString },
    sampleTime: { type: GraphQLString },
    sampleType: { type: GraphQLString },
    sampler: { type: GraphQLString },
    stationName: { type: GraphQLString },
    stationNameTwo: { type: GraphQLString },
    waterBody: { type: GraphQLString },
    waterBodyId: { type: GraphQLString },
    waterCode: { type: GraphQLString },
    watershed: { type: GraphQLString },
    watershedReport: { type: GraphQLString },
  }),
});

const FormFieldType = new GraphQLObjectType({
  name: 'FormField',
  fields: () => ({
    uniqueStationNames: { type: GraphQLList(GraphQLString) },
    uniqueOrganizations: { type: GraphQLList(GraphQLString) },
    uniqueMatrices: { type: GraphQLList(GraphQLString) },
    uniqueWaterBodies: { type: GraphQLList(GraphQLString) },
  }),
});

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
        analyte: { type: GraphQLString },
      },
      resolve(parent, args) {
        const {
          analyte,
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
        if (analyte) queryFilter.analyte = analyte;
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
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
