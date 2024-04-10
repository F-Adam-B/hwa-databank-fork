import { useContext } from 'react';
import { Card, CardContent, Container, Typography } from '@mui/material';
import { NewsFeedCard, NewsFeedForm } from '../index';
import { useQuery } from '@apollo/client';

import { UsersContext } from '../../Providers/UsersContext';
import { NEWS_FEED_QUERY } from '../../graphql/queries/newFeedQueries';
import { NewsFeedProps } from '../../graphql/types';

const EmptyNewsFeedDisplay = () => {
  return (
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
};

const NewsFeed = () => {
  const listOfUsers = useContext(UsersContext);

  const { data, loading } = useQuery(NEWS_FEED_QUERY);

  if (loading) return <>Loading...</>;
  if (!data?.newsFeedPosts.length) return <EmptyNewsFeedDisplay />;
  return (
    <>
      <NewsFeedForm />
      <Container sx={{ marginBottom: '5em' }}>
        {data.newsFeedPosts.map(({ authorId, ...rest }: NewsFeedProps) => {
          // TODO: Will need to get actual name from Auth0;
          const authorName = listOfUsers.find(
            (user) => user.id === authorId
          )?.username;
          return (
            <NewsFeedCard key={rest.id} authorName={authorName} {...rest} />
          );
        })}
      </Container>
    </>
  );
};

export default NewsFeed;
