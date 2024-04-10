import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader, Container } from '@mui/material';
import { formatTimestamp } from '../../utilities';
import { NewsFeedProps } from '../../graphql/types';

interface NewsFeedCardProps extends Omit<NewsFeedProps, 'authorId'> {
  authorName?: string;
}

const NewsFeedCard = (post: NewsFeedCardProps) => {
  return (
    <Card sx={{ marginTop: '2em' }}>
      <CardHeader
        subheader={formatTimestamp(post.createdAt)}
        title={post.authorName}
      />
      {post.imageUrl && (
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
          }}
        >
          <CardMedia
            component="img"
            sx={{
              maxHeight: '100%',
              maxWidth: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
            }}
            image={post.imageUrl}
            alt={`Post by ${post.authorName}`}
          />
        </Container>
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary" align="center">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="error" size="small">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewsFeedCard;
