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
    $analyte: String
  ) {
    sample(
      fromDate: $fromDate
      toDate: $toDate
      matrix: $matrix
      stationName: $stationName
      organization: $organization
      waterBody: $waterBody
      analyte: $analyte
    ) {
      location {
        coordinates
      }
      matrix
      project {
        projectName
        organization
      }
      sampleDate
      waterBody
      watershed
    }
  }
`;
