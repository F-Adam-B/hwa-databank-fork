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
    county: { type: GraphQLString },
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
      type: new GraphQLList(AnalyteInputType),
    },
    dateCollected: { type: GraphQLString },
    elevation: { type: GraphQLString },
    eventId: { type: GraphQLString },
    id: { type: GraphQLID },
    location: { type: LocationInputType },
    matrix: { type: GraphQLString },
    preservationMethods: { type: new GraphQLList(GraphQLString) },
    project: { type: ProjectInputType },
    sampler: { type: GraphQLString },
    sampleComment: { type: GraphQLString },
    sampleNumber: { type: GraphQLString },
    sampleTags: { type: new GraphQLList(GraphQLString) },
    sampleType: { type: GraphQLString },
    stationName: { type: GraphQLString },
    stationNameTwo: { type: GraphQLString },
    timeCollected: { type: GraphQLString },
    waterBody: { type: GraphQLString },
    waterBodyId: { type: GraphQLString },
    waterCode: { type: GraphQLString },
    watershed: { type: GraphQLString },
    watershedReport: { type: GraphQLString },
  },
});

const UserInputType = new GraphQLInputObjectType({
  name: 'UserFormInput',
  fields: () => ({
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const BlogPostInputType = new GraphQLInputObjectType({
  name: 'BlogPostInput',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLID) },
  }),
});

export {
  AnalyteInputType,
  BlogPostInputType,
  LocationInputType,
  ProjectInputType,
  SampleFormValuesInputType,
  UserInputType,
};
