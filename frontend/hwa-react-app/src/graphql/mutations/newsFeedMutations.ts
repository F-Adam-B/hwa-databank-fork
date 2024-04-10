import { gql } from '@apollo/client';

export const SAVE_NEWS_FEED_POST = gql`
  mutation AddNewsFeedMutation($newsFeedValues: NewsFeedValuesInputType!) {
    addNewsFeedMutation(newsFeedValues: $newsFeedValues) {
      authorId
      content
      imageUrl
    }
  }
`;
