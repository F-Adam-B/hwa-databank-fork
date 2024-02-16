import React, { useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Box, Card, Typography, Grid, Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import ControlledInputField from '../ControlledInputField/ControlledInputField';
import ControlledSelectField from '../ControlledSelectField/ControlledSelectField';
import ControlledDateField from '../ControlledDateField/ControlledDateField';
import { GET_SAMPLES } from '../../graphql/queries/sampleQueries';

type SearchFormInput = {
  fromDate: string;
  toDate: string;
  matrix: string;
  organization: string;
  waterBody: string;
  analyte: string;
};

const defaultValues: SearchFormInput = {
  fromDate: '',
  toDate: '',
  matrix: '',
  organization: '',
  waterBody: '',
  analyte: '',
};

const matrices = [
  {
    value: 'Groundwater',
    label: 'Ground Water',
  },
  {
    value: 'surfaceWater',
    label: 'Surface Water',
  },
];

const stationNames = [
  {
    value: 'MW-1',
    label: 'MW-1',
  },
  {
    value: 'MW-2',
    label: 'MW-2',
  },
];

const SearchForm = () => {
  const [selectedFromDate, setSelectedFromDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const { control, handleSubmit, getValues, watch } = useForm({
    defaultValues,
  });

  const [getSample, { loading, error, data }] = useLazyQuery(GET_SAMPLES);

  const onSubmit: SubmitHandler<SearchFormInput> = (formData) => {
    getSample({
      variables: { ...formData },
    });
  };

  return (
    <Box>
      <Typography variant="h5">Search Sample Set</Typography>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <ControlledDateField
                control={control}
                name="fromDate"
                label="From Date"
                value={selectedFromDate}
                onChange={setSelectedFromDate}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ControlledDateField
                control={control}
                name="toDate"
                label="To Date"
                value={selectedEndDate}
                onChange={setSelectedEndDate}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ControlledSelectField
                control={control}
                helperText="Matrix"
                name="matrix"
                label="Matrix"
                options={matrices}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ControlledSelectField
                control={control}
                helperText="Station Name"
                label="Station Name"
                name="stationName"
                options={stationNames}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ControlledSelectField
                control={control}
                helperText="Organization"
                name="organization"
                label="Organization"
                options={matrices}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ControlledSelectField
                control={control}
                helperText="Water Body"
                name="waterBody"
                label="Water Body"
                options={matrices}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ControlledSelectField
                control={control}
                helperText="Analyte"
                name="analyte"
                label="Analyte"
                options={matrices}
              />
            </Grid>
          </Grid>
          <Button type="submit">Submit Query </Button>
        </form>
      </Card>
      <DevTool control={control} /> {/* set up the dev tool */}
    </Box>
  );
};

export default SearchForm;
