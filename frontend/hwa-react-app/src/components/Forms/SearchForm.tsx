import React, { useContext, useMemo, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
  Autocomplete,
  Checkbox,
  Box,
  Card,
  Typography,
  Grid,
  Button,
  TextField,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { DropdownOptionsContext } from '../../Providers/DropdownSelectContext';
import {
  ControlledAutocompleteField,
  ControlledDateField,
  ControlledInputField,
  ControlledSelectField,
  MapBox,
} from '../index';
import { GET_SAMPLES } from '../../graphql/queries/sampleQueries';

type SearchFormInput = {
  fromDate: string | null;
  toDate: string | null;
  matrix: string;
  organization: string;
  stationName: string;
  waterBody: string;
  analytes: string[];
};

const defaultValues: SearchFormInput = {
  fromDate: null,
  toDate: null,
  matrix: '',
  stationName: '',
  organization: '',
  waterBody: '',
  analytes: [],
};

const SearchForm = () => {
  const {
    matricesOptions,
    stationOptions,
    organizationOptions,
    waterBodyOptions,
    analyteOptions,
  } = useContext(DropdownOptionsContext);

  const [selectedFromDate, setSelectedFromDate] = useState<string>('');
  const [selectedEndDate, setSelectedEndDate] = useState<string>('');
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { isDirty },
  } = useForm({
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
      <MapBox data={data} loading={loading} />
      <Typography variant="h5">Search Sample Set</Typography>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <ControlledDateField
                control={control}
                name="fromDate"
                label="From Date"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ControlledDateField
                control={control}
                name="toDate"
                label="To Date"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ControlledSelectField
                control={control}
                helperText="Matrix"
                label="Matrix"
                name="matrix"
                options={matricesOptions}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ControlledSelectField
                control={control}
                helperText="Station Name"
                label="Station Name"
                name="stationName"
                options={stationOptions}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ControlledSelectField
                control={control}
                label="Organization"
                helperText="Organization"
                name="organization"
                options={organizationOptions}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ControlledSelectField
                control={control}
                label="Water Body"
                helperText="Water Body"
                name="waterBody"
                options={waterBodyOptions}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ControlledAutocompleteField
                control={control}
                label="Analytes"
                multiple={true}
                name="analytes"
                options={analyteOptions}
                placeholder="Analytes"
              />
            </Grid>
          </Grid>
          <Button disabled={!isDirty} type="submit">
            Submit Query{' '}
          </Button>
        </form>
      </Card>
      <DevTool control={control} /> {/* set up the dev tool */}
    </Box>
  );
};

export default SearchForm;
