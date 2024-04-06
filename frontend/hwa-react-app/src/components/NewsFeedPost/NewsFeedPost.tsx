import { Container } from '@mui/material';
import { NewsFeedCard, NewsFeedForm } from '../index';

import img from './IMG_0090.jpeg';

const NewsFeed = () => {
  const posts = [
    {
      id: '1',
      title: 'Blog1',
      date: 'June 2, 3939',
      content:
        'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
      imageLabel: 'Image label',
      imageUrl: img,
      author: 'Adam Bradbury',
    },
    {
      id: '2',
      title: 'Blog2',
      date: 'June 4, 3939',
      content:
        'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
      imageLabel: 'Image label',
      imageUrl: img,
      author: 'Cara Bradbury',
    },
  ];
  return (
    <>
      <NewsFeedForm />
      <Container sx={{ marginBottom: '5em' }}>
        {posts.map((post) => (
          <>
            <NewsFeedCard {...post} />
          </>
        ))}
      </Container>
    </>
  );
};

export default NewsFeed;
