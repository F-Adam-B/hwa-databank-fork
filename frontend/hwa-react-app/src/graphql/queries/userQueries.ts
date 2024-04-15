import { gql } from '@apollo/client';

const GET_USERS_QUERY = gql`
  query GetUsersQuery {
    users {
      id
      username
      isAdmin
    }
  }
`;

export { GET_USERS_QUERY };
