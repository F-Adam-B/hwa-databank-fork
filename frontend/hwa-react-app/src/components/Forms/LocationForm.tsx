import React from 'react';
import {
  Controller,
  useForm,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';
import { Box, Card, MenuItem, Select, Typography } from '@mui/material';
import { ControlledInputField } from '../index';

const LocationForm = () => {
  const { control } = useFormContext();

  return (
    <Box>
      <Typography variant="h5">Monitoring Location</Typography>
      <Card>
        <Controller
          name="wellName"
          control={control}
          render={({ field }) => (
            <ControlledInputField
              control={control}
              label="Well Name"
              {...field}
            />
          )}
        />
        <Controller
          name="projectName"
          control={control}
          render={({ field }) => (
            <ControlledInputField
              control={control}
              label="Project Name"
              {...field}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <ControlledInputField
              control={control}
              label="Description"
              {...field}
            />
          )}
        />
        <Controller
          name="subLocation"
          control={control}
          render={({ field }) => (
            <ControlledInputField
              control={control}
              label="Sub-location"
              {...field}
            />
          )}
        />
        <Controller
          name="watershed"
          control={control}
          render={({ field }) => (
            <ControlledInputField
              control={control}
              label="Watershed"
              {...field}
            />
          )}
        />
        <Controller
          name="surfaceWaterUnit"
          control={control}
          render={({ field }) => (
            <ControlledInputField
              control={control}
              label="Surface Water Unit"
              {...field}
            />
          )}
        />
      </Card>
    </Box>
  );
};

export default LocationForm;
