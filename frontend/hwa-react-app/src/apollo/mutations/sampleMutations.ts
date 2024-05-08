import gql from 'graphql-tag';

export const ADD_SAMPLE_MUTATION = gql`
  mutation AddSampleMutation($sampleFormValues: SampleFormValuesInputType!) {
    addSampleMutation(sampleFormValues: $sampleFormValues) {
      sampleNumber
    }
  }
`;
