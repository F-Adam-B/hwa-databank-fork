import { useCallback, useContext, useMemo } from 'react';
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
import { NEWS_FEED_QUERY } from '../../apollo/queries/newFeedQueries';
import { DELETE_NEWS_FEED_POST } from '../../apollo/mutations/newsFeedMutations';
import { NewsFeedProps } from '../../types';
import { GET_USERS_QUERY } from '../../apollo/queries/userQueries';

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
  const { data: listOfUsers, loading, error } = useQuery(GET_USERS_QUERY);

  const { data, loading: newsFeedLoading } = useQuery(NEWS_FEED_QUERY);
  const [
    deleteNewsFeedPost,
    { data: deleteNewsFeedMutationData, error: deleteNewsFeedMutationError },
  ] = useMutation(DELETE_NEWS_FEED_POST);

  const handleDeleteNewsFeedPost = useCallback(async (id: string) => {
    try {
      await deleteNewsFeedPost({
        variables: { id },
        refetchQueries: [{ query: NEWS_FEED_QUERY }],
      });
    } catch (error) {
      console.error(`Error deleting news feed post with ID ${id}:`, error);
    }
  }, []);

  const getAuthorName = useMemo(
    () => (authorId: string) =>
      listOfUsers.find(
        (user: { id: string; username: string; isAdmin: string }) =>
          user.id === authorId
      )?.username,
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
