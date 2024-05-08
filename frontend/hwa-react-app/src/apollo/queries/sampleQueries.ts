import { gql } from '@apollo/client';

const SAMPLE_LOCATION_FRAGMENT = gql`
  fragment SampleLocation on Sample {
    location {
      coordinates
    }
  }
`;

const SAMPLE_DETAILS_FRAGMENT = gql`
  fragment SampleDetails on Sample {
    id
    sampleNumber
    stationName
    ...SampleLocation
  }
  ${SAMPLE_LOCATION_FRAGMENT}
`;

export const GET_ALL_SAMPLES = gql`
  query GetAllSamples {
    samples {
      ...SampleDetails
    }
  }
  ${SAMPLE_DETAILS_FRAGMENT}
`;

export const GET_SAMPLES = gql`
  query GetSamples(
    $fromDate: Date
    $toDate: Date
    $matrix: String
    $stationName: String
    $organization: String
    $waterBody: String
    $analytes: [String!]
  ) {
    sample(
      fromDate: $fromDate
      toDate: $toDate
      matrix: $matrix
      stationName: $stationName
      organization: $organization
      waterBody: $waterBody
      analytes: $analytes
    ) {
      ...SampleLocation
      matrix
      project {
        projectName
        organization
      }
      sampleDate
      sampleNumber
      stationName
      waterBody
      watershed
    }
  }
  ${SAMPLE_LOCATION_FRAGMENT}
`;

export const GET_SEARCH_SAMPLE_FORM_FIELDS = gql`
  query GetSearchSampleFormFields {
    formFieldValues {
      uniqueMatrices
      uniqueWaterBodies
      uniqueStationNames
      uniqueOrganizations
    }
  }
`;
