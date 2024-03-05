import React, { useContext } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { DropdownOptionsContext } from '../../Providers/DropdownSelectContext';
import {
  Controller,
  useForm,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';
import { Box, Card, Grid, MenuItem, Select, Typography } from '@mui/material';
import { ControlledInputField, ControlledSelectField } from '../index';
import ControlledDateField from '../ControlledDateField/ControlledDateField';
import ControlledTimeField from '../ControlledTimeField/ControlledTimeField';
import { DevTool } from '@hookform/devtools';
import { GET_SEARCH_SAMPLE_FORM_FIELDS } from '../../graphql/queries/sampleQueries';
import { TOptions } from './SearchForm';

type TSampleForm = {
  dateCollected: string;
  eventID: number;
  organization: string;
  projectName: string;
  sampleID: number;
  stationName: TOptions[];
  timeCollected: string;
};

const defaultValues = {
  dateCollected: null,
  eventID: null,
  organization: '',
  projectName: '',
  stationName: [],
  sampleID: null,
  timeCollected: null,
};

const SampleForm = () => {
  const {
    matricesOptions,
    stationOptions,
    organizationOptions,
    waterBodyOptions,
    analyteOptions,
  } = useContext(DropdownOptionsContext);
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { isDirty },
  } = useForm({
    defaultValues,
  });

  const onSubmit: SubmitHandler<TSampleForm> = (formData) => {};

  return (
    <Box>
      <Typography variant="h5">Sample Form</Typography>
      <Card>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <ControlledDateField
                control={control}
                label="Date Collected"
                name="dateCollected"
              />
              <ControlledTimeField
                control={control}
                label="Time Collected"
                name="timeCollected"
              />
              <ControlledInputField
                control={control}
                label="Organization"
                name="organization"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <ControlledInputField
                control={control}
                label="Project Name"
                name="projectName"
              />

              <ControlledInputField
                control={control}
                label="Event ID"
                name="eventID"
              />
              <ControlledInputField
                control={control}
                label="Sample ID"
                name="sampleID"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ControlledSelectField
                control={control}
                helperText="Station Name"
                label="Station Name"
                name="stationName"
                options={[{ label: 'None', value: 'None' }]}
              />
            </Grid>
          </Grid>
        </form>
      </Card>
      <DevTool control={control} /> {/* set up the dev tool */}
    </Box>
  );
};

export default SampleForm;
