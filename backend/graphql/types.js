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

const AnalyteType = new GraphQLObjectType({
  name: 'Analyte',
  fields: () => ({
    analyteName: { type: GraphQLString },
    characteristics: { type: new GraphQLList(CharacteristicType) },
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

const FormFieldType = new GraphQLObjectType({
  name: 'FormField',
  fields: () => ({
    uniqueStationNames: { type: GraphQLList(GraphQLString) },
    uniqueOrganizations: { type: GraphQLList(GraphQLString) },
    uniqueMatrices: { type: GraphQLList(GraphQLString) },
    uniqueWaterBodies: { type: GraphQLList(GraphQLString) },
  }),
});

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
      type: GraphQLList(GraphQLFloat),
    },
    county: { type: GraphQLString },
    elevation: { type: GraphQLString },
    elevationToGrade: { type: GraphQLString },
    locationDescription: { type: GraphQLString },
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

const SampleType = new GraphQLObjectType({
  name: 'Sample',
  fields: () => ({
    analytesTested: { type: new GraphQLList(AnalyteType) },
    dateCollected: { type: GraphQLString },
    elevation: { type: GraphQLString },
    eventId: { type: GraphQLString },
    location: { type: LocationType },
    matrix: { type: GraphQLString },
    project: { type: ProjectType },
    sampleComment: { type: GraphQLString },
    sampleDate: { type: GraphQLDate },
    sampleNumber: { type: GraphQLString },
    sampler: { type: GraphQLString },
    sampleTime: { type: GraphQLString },
    sampleType: { type: GraphQLString },
    stationName: { type: GraphQLString },
    stationNameTwo: { type: GraphQLString },
    waterBody: { type: GraphQLString },
    waterBodyId: { type: GraphQLString },
    waterCode: { type: GraphQLString },
    watershed: { type: GraphQLString },
    watershedReport: { type: GraphQLString },
  }),
});

export {
  AnalyteType,
  CharacteristicType,
  FormFieldType,
  GraphQLDate,
  LocationType,
  ProjectType,
  SampleType,
};
