import { gql } from '@apollo/client';

const SAVE_NEWS_FEED_POST = gql`
  mutation AddNewsFeedMutation($newsFeedValues: NewsFeedValuesInputType!) {
    addNewsFeedMutation(newsFeedValues: $newsFeedValues) {
      authorId
      content
      imageUrl
    }
  }
`;

const DELETE_NEWS_FEED_POST = gql`
  mutation DeleteNewsFeed($id: ID!) {
    deleteNewsFeedMutation(id: $id) {
      createdAt
      content
      authorId
      imageUrl
      id
    }
  }
`;
export { DELETE_NEWS_FEED_POST, SAVE_NEWS_FEED_POST };
