import React from 'react';
import {
  Controller,
  useForm,
  SubmitHandler,
  FormProvider,
} from 'react-hook-form';
import { Box, Card, Input, MenuItem, Select, Typography } from '@mui/material';
import {
  InformationForm,
  LocationForm,
  ResultsForm,
  SampleForm,
} from '../../components';

const FormPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <SampleForm />
    </Box>
  );
};

export default FormPage;
