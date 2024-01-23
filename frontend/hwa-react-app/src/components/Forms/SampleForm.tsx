import React from 'react';
import {
  Controller,
  useForm,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';
import { Box, Card, MenuItem, Select, Typography } from '@mui/material';
import { ControlledInputField } from '../index';

const SampleForm = () => {
  const { control } = useFormContext();

  return (
    <Box>
      <Typography variant="h5">Sample Form</Typography>
      <Card>
        <Controller
          name="collectionDate"
          control={control}
          render={({ field }) => (
            <ControlledInputField label="Collection Date" {...field} />
          )}
        />
        <Controller
          name="collectionTime"
          control={control}
          render={({ field }) => (
            <ControlledInputField label="Collection Time" {...field} />
          )}
        />
        <Controller
          name="sampleVolume"
          control={control}
          render={({ field }) => (
            <ControlledInputField label="Sample Volume" {...field} />
          )}
        />
        <Controller
          name="characteristicsMeasured"
          control={control}
          render={({ field }) => (
            <ControlledInputField label="Characteristics Measured" {...field} />
          )}
        />
        <Controller
          name="activityMedia"
          control={control}
          render={({ field }) => (
            <ControlledInputField label="Activity Media" {...field} />
          )}
        />
        <Controller
          name="activityMediaSubdivision"
          control={control}
          render={({ field }) => (
            <ControlledInputField
              label="Activity Media Subdivision"
              {...field}
            />
          )}
        />
      </Card>
    </Box>
  );
};

export default SampleForm;
