import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar Date
  scalar Upload

  input File {
    name: String!
    type: String!
    size: Int!
  }

  type Query {
    analytes: [AnalyteType]
    analytesCharacteristics(listOfAnalyteNames: [String]!): [AnalyteType]!
    formFieldValues: FormFieldType
    sample(
      fromDate: Date
      toDate: Date
      matrix: String
      stationName: String
      organization: String
      waterBody: String
      analytes: [String]
    ): [Sample]
    samples: [Sample]
    users: [UserType]
  }

  type Mutation {
    addSampleMutation(sampleFormValues: SampleFormValuesInputType): Sample
    addUserMutation(userFormValues: UserFormValuesInputType): UserType
    addNewsFeedMutation(newsFeedValues: NewsFeedValuesInputType): NewsFeed
  }

  type AnalyteType {
    analyteName: String
    characteristics: [Characteristic]
  }

  type Characteristic {
    name: String
    description: String
    value: String
  }

  type FormFieldType {
    uniqueStationNames: [String]
    uniqueOrganizations: [String]
    uniqueMatrices: [String]
    uniqueWaterBodies: [String]
  }

  type Location {
    coordinates: [Float]
    county: String
    elevation: String
    elevationToGrade: String
    locationDescription: String
  }

  type Project {
    projectName: String
    organization: String
    labName: String
    labId: String
  }

  type Sample {
    analytesTested: [AnalyteType]
    dateCollected: String
    elevation: String
    eventId: String
    location: Location
    matrix: String
    project: Project
    sampleComment: String
    sampleDate: Date
    sampleNumber: String
    sampler: String
    sampleTime: String
    sampleType: String
    stationName: String
    stationNameTwo: String
    waterBody: String
    waterBodyId: String
    waterCode: String
    watershed: String
    watershedReport: String
  }

  type UserType {
    username: String
    email: String
    isAdmin: Boolean
    createdAt: Date
  }

  type NewsFeed {
    authorId: ID
    content: String
    createdAt: Date
    imageUrl: String
  }

  input AnalyteInput {
    analyteName: String
    characteristics: [CharacteristicInput]
  }

  input CharacteristicInput {
    name: String
    description: String
    value: String
  }

  input LocationInput {
    coordinates: [Float]
    county: String
    elevation: String
    elevationToGrade: String
    locationDescription: String
  }

  input ProjectInput {
    projectName: String
    organization: String
    labName: String
    labId: String
  }

  input SampleFormValuesInputType {
    analytesTested: [AnalyteInput]
    dateCollected: String
    elevation: String
    eventId: String
    id: ID
    location: LocationInput
    matrix: String
    preservationMethods: [String]
    project: ProjectInput
    sampler: String
    sampleComment: String
    sampleNumber: String
    sampleType: String
    stationName: String
    stationNameTwo: String
    timeCollected: String
    waterBody: String
    waterBodyId: String
    waterCode: String
    watershed: String
    watershedReport: String
  }

  input UserFormValuesInputType {
    username: String!
    email: String!
  }

  input NewsFeedValuesInputType {
    content: String!
    authorId: ID!
    imageFile: Upload
  }
`;

export default typeDefs;
