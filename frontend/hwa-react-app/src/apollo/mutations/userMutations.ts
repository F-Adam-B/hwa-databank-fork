import { gql } from '@apollo/client';

const ADD_USER_MUTATION = gql`
  mutation AddUserMutation($userFormValues: UserFormInput!) {
    addUserMutation(userFormValues: $userFormValues) {
      username
      isAdmin
    }
  }
`;
