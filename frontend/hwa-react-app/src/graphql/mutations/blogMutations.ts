import { gql } from '@apollo/client';

export const ADD_BLOG_POST_MUTATION = gql`
  mutation AddNewsFeedMutation($newsFeedValues: NewsFeedValuesInputType!) {
    addNewsFeedMutation(newsFeedValues: $newsFeedValues) {
      authorId
      content
      title
    }
  }
`;
