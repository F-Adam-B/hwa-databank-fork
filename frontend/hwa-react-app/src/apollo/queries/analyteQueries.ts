import { gql } from '@apollo/client';

export const GET_ANALYTE_CHARACTERISTICS_QUERY = gql`
  query GetAnalyteCharacteristicsQuery($names: [String]!) {
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
