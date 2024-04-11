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
  Alert,
  Tooltip,
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
import { SAVE_NEWS_FEED_POST } from '../../graphql/mutations/newsFeedMutations';
import { UsersContext } from '../../Providers/UsersContext';
import FileUploader from '../FileUploader/FileUploader';
import { NEWS_FEED_QUERY } from '../../graphql/queries/newFeedQueries';

type TNewsFeedForm = {
  content: string;
  image?: File | undefined;
};

const defaultValues: TNewsFeedForm = {
  content: '',
  image: undefined,
};

const NewsFeedForm = () => {
  const { control, handleSubmit, reset, register, setValue, watch } = useForm({
    defaultValues,
  });
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>();

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

  const onSubmit = async (formValues: any) => {
    const { content, image } = formValues;

    let uploadedFile;
    if (image) {
      uploadedFile = image;
    }

    try {
      await addNewsFeedMutation({
        variables: {
          newsFeedValues: {
            authorId: '6604977667d171225cec046f', // TODO - fetch current user & add check if authorized
            content,
            imageFile: uploadedFile,
          },
        },
      });
      reset();
      setFile(null);
    } catch (error) {
      console.error('Error saving news feed post: ', error);
    }
  };

  const handleUploadClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setValue('image', event.target.files[0]);
    }
  };

  useEffect(() => {
    register('image');
  }, [register]);

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
        <Typography variant="caption">{file?.name}</Typography>
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
        {addNewsFeedData && <Alert severity="success">News feed saved</Alert>}
        {addNewsFeedError && (
          <Alert severity="error">Error saving news feed post</Alert>
        )}
      </Box>
    </Container>
  );
};

export default NewsFeedForm;
