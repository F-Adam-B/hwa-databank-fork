import React from 'react';
import {
  Controller,
  useForm,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';
import { Box, Card, Input, MenuItem, Select, Typography } from '@mui/material';
import { ControlledInputField } from '../index';
type InfoFormInput = {
  organizationName: string;
  projectName: string;
};

const defaultValues: InfoFormInput = {
  organizationName: '',
  projectName: '',
};

const InformationForm = () => {
  const { control } = useFormContext();

  return (
    <Box>
      <Typography variant="h5">Project Information</Typography>
      <Card>
        <Controller
          name="organizationName"
          control={control}
          render={({ field }) => (
            <ControlledInputField
              control={control}
              label="Organization Name"
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
              label="Project Type"
              {...field}
            />
          )}
        />
      </Card>
    </Box>
  );
};

export default InformationForm;
