import { gql } from '@apollo/client';

export const GET_ALL_SAMPLES = gql`
  query GetAllSamples {
    samples {
      id
      location {
        coordinates
      }
      sampleNumber
      stationName
    }
  }
`;

export const GET_SAMPLES = gql`
  query GetSamples(
    $fromDate: Date
    $toDate: Date
    $matrix: String
    $stationName: String
    $organization: String
    $waterBody: String
    $analytes: [String]
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
      id
      location {
        coordinates
      }
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

export const GET_ANALYTES = gql`
  query GetAnalytes {
    analytes {
      analyteName
    }
  }
`;
