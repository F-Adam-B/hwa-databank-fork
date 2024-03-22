import { Button, Container, Divider, Typography } from '@mui/material';
import ControlledInputField from '../ControlledInputField/ControlledInputField';
import { useForm } from 'react-hook-form';

const BlogForm = () => {
  const { control } = useForm();

  return (
    <Container>
      <Typography>Blog Form</Typography>
      <form>
        <ControlledInputField control={control} name="title" />
        <Divider />
        <ControlledInputField
          multiline={true}
          control={control}
          name="content"
        />
        <Button>Save Post</Button>
      </form>
    </Container>
  );
};

export default BlogForm;
