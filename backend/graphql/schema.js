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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
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
        if (organization) queryFilter.organization = organization;
        if (analyte) queryFilter.analyte = analyte;
        if (fromDate) queryFilter.fromDate = { $gte: fromDate };
        if (toDate) queryFilter.toDate = { $gte: toDate };
        if (waterBody) queryFilter.waterBody = waterBody;
        // Return the filtered water samples

        console.log(queryFilter, 'queryFilter');
        return WaterSample.find(queryFilter);
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
