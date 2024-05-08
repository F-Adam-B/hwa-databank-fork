import { ChangeEvent, useCallback, useRef } from 'react';
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { DevTool } from '@hookform/devtools';

import { SAVE_NEWS_FEED_POST } from '../../apollo/mutations/newsFeedMutations';
import { NEWS_FEED_QUERY } from '../../apollo/queries/newFeedQueries';
import { TNewsFeedFormProps } from '../../types';

const defaultValues: TNewsFeedFormProps = {
  content: '',
  image: null,
};

const currentUser = {
  id: '6601e3d09329a7cb0f73d989',
  username: 'fadambrad',
  isAdmin: true,
  __typename: 'UserType',
};

const NewsFeedForm = () => {
  const { control, handleSubmit, reset, register, setValue, watch } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const [
    addNewsFeedMutation,
    { data: addNewsFeedData, error: addNewsFeedError },
  ] = useMutation(SAVE_NEWS_FEED_POST, {
    refetchQueries: [NEWS_FEED_QUERY],
  });

  const watchAllFields = watch();
  const atLeastOneFieldFilledIn = Object.values(watchAllFields).some(
    (value) => value
  );

  const onSubmit = useCallback(
    async (formValues: TNewsFeedFormProps) => {
      const { content, image: uploadedFile } = formValues;

      try {
        await addNewsFeedMutation({
          variables: {
            newsFeedValues: {
              authorId: currentUser.id,
              content,
              imageFile: uploadedFile,
            },
          },
        });
        reset();
      } catch (error) {
        console.error('Error saving news feed post: ', error);
      }
    },
    [addNewsFeedMutation, currentUser.id, reset]
  );

  const handleUploadClick = useCallback(() => {
    hiddenFileInput.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setValue('image', file, { shouldValidate: true });
      }
    },
    [setValue]
  );

  register('image');

  const fileName = watch('image');

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ marginTop: '2em' }}>
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

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Tooltip title="Upload Image">
          <IconButton
            type="button"
            onClick={handleUploadClick}
            sx={{ p: '10px' }}
            aria-label="upload image"
          >
            <UploadIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="caption">
          {fileName && typeof fileName === 'object' ? fileName.name : ''}
        </Typography>{' '}
        <DevTool control={control} />
        <Button
          form="newsFeedForm"
          type="submit"
          disabled={!atLeastOneFieldFilledIn}
        >
          Save Post
        </Button>
      </Box>
      <Box>
        {currentUser.isAdmin && (
          <>
            {addNewsFeedData && (
              <Alert severity="success">News feed saved</Alert>
            )}
            {addNewsFeedError && (
              <Alert severity="error">Error saving news feed post</Alert>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default NewsFeedForm;
