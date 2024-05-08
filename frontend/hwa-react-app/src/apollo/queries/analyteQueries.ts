import { gql } from '@apollo/client';

export const GET_ANALYTE_CHARACTERISTICS = gql`
  query GetAnalyteCharacteristics($names: [String]!) {
    analytesCharacteristics(names: $names) {
      analyteName
      characteristics {
        name
      }
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
