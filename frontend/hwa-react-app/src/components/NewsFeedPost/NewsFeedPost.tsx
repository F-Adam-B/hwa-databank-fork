import { useContext, useMemo } from 'react';
import {
  Alert,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { NewsFeedCard, NewsFeedForm } from '../index';
import { useMutation, useQuery } from '@apollo/client';

import { UsersContext } from '../../Providers/UsersContext';
import { NEWS_FEED_QUERY } from '../../graphql/queries/newFeedQueries';
import { DELETE_NEWS_FEED_POST } from '../../graphql/mutations/newsFeedMutations';
import { NewsFeedProps } from '../../graphql/types';

const EmptyNewsFeedDisplay = () => (
  <Container>
    <Card sx={{ marginTop: '2em' }}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          No News Feed Posts to Display
        </Typography>
      </CardContent>
    </Card>
  </Container>
);

const NewsFeed = () => {
  const listOfUsers = useContext(UsersContext);
  const { data, loading } = useQuery(NEWS_FEED_QUERY);
  const [
    deleteNewsFeedPost,
    { data: deleteNewsFeedMutationData, error: deleteNewsFeedMutationError },
  ] = useMutation(DELETE_NEWS_FEED_POST);

  const handleDeleteNewsFeedPost = async (id: string) => {
    try {
      await deleteNewsFeedPost({
        variables: { id },
        refetchQueries: [{ query: NEWS_FEED_QUERY }],
      });
    } catch (error) {
      console.error(`Error deleting news feed post with ID ${id}:`, error);
    }
  };

  // Memoizing the function to find an author's username to avoid recomputing on each render
  const getAuthorName = useMemo(
    () => (authorId: string) =>
      listOfUsers.find((user) => user.id === authorId)?.username,
    [listOfUsers]
  );

  if (loading) return <>Loading...</>;

  return (
    <>
      <NewsFeedForm />
      {!data?.newsFeedPosts.length ? <EmptyNewsFeedDisplay /> : null}
      {deleteNewsFeedMutationData && (
        <Alert severity="success">News Feed Post successfully deleted</Alert>
      )}
      {deleteNewsFeedMutationError && (
        <Alert severity="error">Error deleting news feed post</Alert>
      )}
      <Grid
        container
        justifyContent="center"
        spacing={1}
        sx={{ marginBottom: '2em' }}
      >
        {data.newsFeedPosts.map(({ authorId, ...rest }: NewsFeedProps) => {
          const authorName = getAuthorName(authorId);
          return (
            <Grid key={rest.id} item xs={12} md={6} lg={4}>
              <NewsFeedCard
                authorName={authorName}
                {...rest}
                onDelete={handleDeleteNewsFeedPost}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default NewsFeed;
