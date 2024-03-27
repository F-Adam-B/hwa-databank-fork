import * as React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

interface NewsFeedProps {
  post: {
    date: string;
    content: string;
    image: string;
    imageLabel: string;
    title: string;
  };
}

const NewsFeed = () => {
  const posts = [
    {
      title: 'Blog1',
      date: 'June 2, 3939',
      content: 'Some blog description',
      imageLabel: 'Image label',
    },
  ];
  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      {posts.map((post) => (
        <Box>
          <Typography variant="h6" gutterBottom>
            {post.title}
          </Typography>
          <Divider />
          <Card>
            <CardContent className="markdown" key={post.title}>
              {post.content}
            </CardContent>
          </Card>
        </Box>
      ))}
    </Grid>
  );
};

export default NewsFeed;
