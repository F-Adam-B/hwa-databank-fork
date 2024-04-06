import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  Paper,
  InputBase,
  IconButton,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import UploadIcon from '@mui/icons-material/Upload';
import { Controller } from 'react-hook-form';

import ControlledInputField from '../ControlledInputField/ControlledInputField';
import { useForm } from 'react-hook-form';
import { useLazyQuery, useMutation } from '@apollo/client';
import { DevTool } from '@hookform/devtools';

import { NewsFeed } from '../../graphql/types';
import { ADD_BLOG_POST_MUTATION } from '../../graphql/mutations/blogMutations';
import { UsersContext } from '../../Providers/UsersContext';
import FileUploader from '../FileUploader/FileUploader';

type TNewsFeedForm = {
  content: string;
  file?: File | undefined;
  title: string;
};

const defaultValues: TNewsFeedForm = {
  content: '',
  file: undefined,
  title: '',
};

const NewsFeedForm = () => {
  const listOfUsers = useContext(UsersContext);

  const { control, handleSubmit, register, setValue } = useForm();
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const [addNewsFeedMutation, { data: addNewsFeedData }] = useMutation(
    ADD_BLOG_POST_MUTATION
  );

  const onSubmit = async (formValues: any) => {
    const { content, image } = formValues;

    let uploadedFile;
    if (image) {
      uploadedFile = image[0];
    }

    try {
      await addNewsFeedMutation({
        variables: {
          newsFeedValues: {
            authorId: '6601e3d09329a7cb0f73d989', // TODO - fetch current user & add check if authorized
            content,
            imageFile: uploadedFile,
          },
        },
      });
    } catch (error) {
      console.error('Error saving blog post: ', error);
    }
  };

  const handleUploadClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setValue('image', event.target.files);
    }
  };

  useEffect(() => {
    register('image');
  }, [register]);

  return (
    <Container sx={{ display: 'flex' }}>
      <Box sx={{ marginTop: '2em', width: '55em' }}>
        <Paper
          component="form"
          id="newsFeedForm"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputBase
            sx={{ ml: 1, flex: 8 }}
            placeholder="Message"
            multiline={true}
            {...register('content')}
            inputProps={{
              'aria-label': 'Post news feed content',
            }}
          />
          {/* <Divider orientation="vertical" flexItem={true} /> */}
          <input
            ref={hiddenFileInput}
            type="file"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </Paper>
      </Box>

      <Box sx={{ marginTop: '2em' }}>
        <IconButton
          type="button"
          onClick={handleUploadClick}
          sx={{ p: '10px' }}
          aria-label="upload image"
        >
          <UploadIcon />
        </IconButton>
        <DevTool control={control} />
        <Button form="newsFeedForm" type="submit">
          Save Post
        </Button>
      </Box>
    </Container>
  );
};

export default NewsFeedForm;
