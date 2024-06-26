import { gql } from '@apollo/client';

const NEWS_FEED_QUERY = gql`
  query NewsFeedPosts {
    newsFeedPosts {
      id
      authorId
      content
      createdAt
      imageUrl
    }
  }
`;

export { NEWS_FEED_QUERY };
