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
  onDelete: (id: string) => void;
}

const NewsFeedCard = (post: NewsFeedCardProps) => {
  const { authorName, createdAt, imageUrl, onDelete, id } = post;
  return (
    <Card sx={{ marginTop: '2em', maxWidth: '600px' }}>
      <CardHeader
        subheader={formatTimestamp(createdAt)}
        title={post.authorName}
      />
      {imageUrl && (
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
            image={imageUrl}
            alt={`Post by ${authorName}`}
          />
        </Container>
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary" align="center">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => onDelete(id)} color="error" size="small">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewsFeedCard;
