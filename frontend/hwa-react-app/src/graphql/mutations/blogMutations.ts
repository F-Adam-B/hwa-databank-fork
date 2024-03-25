import { gql } from '@apollo/client';

export const ADD_BLOG_POST_MUTATION = gql`
  mutation AddBlogPostMutation($blogFormValues: BlogPostValuesInputType) {
    addBlogPostMutation(blogFormValues: $blogFormValues) {
      authorId
      content
      title
    }
  }
`;
