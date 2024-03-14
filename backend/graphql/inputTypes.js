import {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLFloat,
} from 'graphql';

const AnalyteInputType = new GraphQLInputObjectType({
  name: 'AnalyteInput',
  fields: {
    analyteName: { type: GraphQLString },
    characteristics: {
      type: new GraphQLList(
        new GraphQLInputObjectType({
          name: 'CharacteristicInput',
          fields: () => ({
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            value: { type: GraphQLString },
          }),
        })
      ),
    },
  },
});

const LocationInputType = new GraphQLInputObjectType({
  name: 'LocationInput',
  fields: {
    // type: {
    //   type: new GraphQLNonNull(GraphQLString),
    // },
    coordinates: {
      type: new GraphQLList(GraphQLFloat),
    },
    county: { type: new GraphQLNonNull(GraphQLString) },
    elevation: { type: GraphQLString },
    elevationToGrade: { type: GraphQLString },
    locationDescription: { type: GraphQLString },
  },
});

const ProjectInputType = new GraphQLInputObjectType({
  name: 'ProjectInput',
  fields: {
    projectName: { type: GraphQLString },
    organization: { type: GraphQLString },
    labName: { type: GraphQLString },
    labId: { type: GraphQLString },
  },
});

const SampleFormValuesInputType = new GraphQLInputObjectType({
  name: 'SampleFormValuesInputType',
  fields: {
    analytesTested: {
      type: new GraphQLNonNull(new GraphQLList(AnalyteInputType)),
    },
    dateCollected: { type: GraphQLString },
    elevation: { type: GraphQLString },
    eventId: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: new GraphQLNonNull(GraphQLID) },
    location: { type: new GraphQLNonNull(LocationInputType) },
    matrix: { type: new GraphQLNonNull(GraphQLString) },
    preservationMethods: { type: new GraphQLList(GraphQLString) },
    project: { type: new GraphQLNonNull(ProjectInputType) },
    sampler: { type: GraphQLString },
    sampleComment: { type: GraphQLString },
    sampleNumber: { type: new GraphQLNonNull(GraphQLString) },
    sampleTags: { type: new GraphQLList(GraphQLString) },
    sampleType: { type: new GraphQLNonNull(GraphQLString) },
    stationName: { type: new GraphQLNonNull(GraphQLString) },
    stationNameTwo: { type: GraphQLString },
    timeCollected: { type: GraphQLString },
    waterBody: { type: new GraphQLNonNull(GraphQLString) },
    waterBodyId: { type: new GraphQLNonNull(GraphQLString) },
    waterCode: { type: GraphQLString },
    watershed: { type: new GraphQLNonNull(GraphQLString) },
    watershedReport: { type: GraphQLString },
  },
});

export {
  AnalyteInputType,
  LocationInputType,
  ProjectInputType,
  SampleFormValuesInputType,
};
