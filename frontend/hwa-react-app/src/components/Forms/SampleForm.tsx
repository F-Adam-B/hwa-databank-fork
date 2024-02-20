import React from 'react';
import {
  Controller,
  useForm,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';
import { Box, Card, MenuItem, Select, Typography } from '@mui/material';
import { ControlledInputField } from '../index';
import ControlledDateField from '../ControlledDateField/ControlledDateField';
import ControlledTimeField from '../ControlledTimeField/ControlledTimeField';

const SampleForm = () => {
  const { control } = useFormContext();

  return (
    <Box>
      <Typography variant="h5">Sample Form</Typography>
      <Card>
        <ControlledDateField control={control} name="collectionDate" />
        <ControlledTimeField control={control} name="collectionTime" />
        <Controller
          name="sampleVolume"
          control={control}
          render={({ field }) => (
            <ControlledInputField
              control={control}
              label="Sample Volume"
              {...field}
            />
          )}
        />
        <Controller
          name="characteristicsMeasured"
          control={control}
          render={({ field }) => (
            <ControlledInputField
              control={control}
              label="Characteristics Measured"
              {...field}
            />
          )}
        />
        <Controller
          name="activityMedia"
          control={control}
          render={({ field }) => (
            <ControlledInputField
              control={control}
              label="Activity Media"
              {...field}
            />
          )}
        />
        <Controller
          name="activityMediaSubdivision"
          control={control}
          render={({ field }) => (
            <ControlledInputField
              control={control}
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
