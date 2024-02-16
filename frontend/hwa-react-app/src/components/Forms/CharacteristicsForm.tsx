import React from 'react';
import {
  Controller,
  useForm,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';
import { Box, Card, MenuItem, Select, Typography } from '@mui/material';
import { ControlledInputField } from '../index';

const CharacteristicsForm = () => {
  const { control } = useFormContext();

  return (
    <Box>
      <Typography variant="h5">Characteristics Form</Typography>
      <Card>
        <Controller
          name="characteristicGroup"
          control={control}
          render={({ field }) => (
            <ControlledInputField
              control={control}
              label="Characteristic Group"
              {...field}
            />
          )}
        />
        <Controller
          name="characteristic"
          control={control}
          render={({ field }) => (
            <ControlledInputField
              control={control}
              label="Characteristic"
              {...field}
            />
          )}
        />
        <Controller
          name="sampleFraction"
          control={control}
          render={({ field }) => (
            <ControlledInputField
              control={control}
              label="Sample Fraction"
              {...field}
            />
          )}
        />
        <Controller
          name="resultMeasureQualifier"
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
          name="result"
          control={control}
          render={({ field }) => (
            <ControlledInputField
              control={control}
              label="Activity Media"
              {...field}
            />
          )}
        />
      </Card>
    </Box>
  );
};

export default CharacteristicsForm;
