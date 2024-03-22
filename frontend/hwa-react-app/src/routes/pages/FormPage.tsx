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

type InfoFormInput = {
  characteristic: string;
  characteristicGroup: string;
  collectionDate: string;
  collectionTime: string;
  description: string;
  organizationName: string;
  projectName: string;
  result: string;
  resultMeasureQualifier: string;
  sampleFraction: string;
  subLocation: string;
  surfaceWaterUnit: string;
  watershed: string;
  wellName: string;
};

const defaultValues: InfoFormInput = {
  characteristic: '',
  characteristicGroup: '',
  collectionDate: '',
  collectionTime: '',
  description: '',
  organizationName: '',
  projectName: '',
  result: '',
  resultMeasureQualifier: '',
  sampleFraction: '',
  subLocation: '',
  surfaceWaterUnit: '',
  watershed: '',
  wellName: '',
};

const FormPage = () => {
  const methods = useForm({
    defaultValues,
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <FormProvider {...methods}>
        <form>
          <SampleForm />
        </form>
      </FormProvider>
    </Box>
  );
};

export default FormPage;
