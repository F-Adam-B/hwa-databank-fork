import { Button, Container, Divider, Typography } from '@mui/material';
import ControlledInputField from '../ControlledInputField/ControlledInputField';
import { useForm } from 'react-hook-form';
import { useLazyQuery, useMutation } from '@apollo/client';
import { DevTool } from '@hookform/devtools';

import { BlogPost } from '../../graphql/types';
import { ADD_BLOG_POST_MUTATION } from '../../graphql/mutations/blogMutations';
import { useContext } from 'react';
import { UsersContext } from '../../Providers/UsersContext';

type TBlogPostForm = {
  title: string;
  content: string;
};

const defaultValues: TBlogPostForm = {
  title: '',
  content: '',
};

const BlogForm = () => {
  const listOfUsers = useContext(UsersContext);

  const [addBlogPostMutation, { data: addBlogPostData }] = useMutation(
    ADD_BLOG_POST_MUTATION
  );
  const { control, handleSubmit } = useForm({ defaultValues });

  const onSubmit = async (formValues: TBlogPostForm) => {
    try {
      await addBlogPostMutation({
        variables: {
          blogFormValues: {
            authorId: '6601e3d09329a7cb0f73d989', // TODO - fetch current user
            ...formValues,
          },
        },
      });
    } catch (error) {
      console.error('Error saving blog post');
    }
  };

  return (
    <Container>
      <Typography>Blog Form</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledInputField control={control} name="title" label="Title" />
        <Divider />
        <ControlledInputField
          label="Content"
          control={control}
          multiline={true}
          name="content"
          sx={{
            minHeight: '500px',
            minWidth: '500px',
          }}
        />
        <Button type="submit">Save Post</Button>
      </form>
      <DevTool control={control} />
    </Container>
  );
};

export default BlogForm;
