import React, { useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Box, Card, Typography, Grid, Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import ControlledInputField from '../ControlledInputField/ControlledInputField';
import ControlledSelectField from '../ControlledSelectField/ControlledSelectField';
import ControlledDateField from '../ControlledDateField/ControlledDateField';
import {
  GET_ANALYTES,
  GET_SAMPLES,
  GET_SEARCH_SAMPLE_FORM_FIELDS,
} from '../../graphql/queries/sampleQueries';

import { createFormDropdownObject } from '../../utilities';

type SearchFormInput = {
  fromDate: string | null;
  toDate: string | null;
  matrix: string;
  organization: string;
  waterBody: string;
  analyte: string;
};

const defaultValues: SearchFormInput = {
  fromDate: null,
  toDate: null,
  matrix: '',
  organization: '',
  waterBody: '',
  analyte: '',
};

const SearchForm = () => {
  const {
    loading: searchSampleFormFieldsLoading,
    error: searchSampleFormFieldsError,
    data: searchSampleFormFieldData,
  } = useQuery(GET_SEARCH_SAMPLE_FORM_FIELDS);

  const { loading: analytesLoading, data: analytesData } = useQuery(
    GET_ANALYTES,
    {
      fetchPolicy: 'cache-only',
    }
  );

  type TOptions = {
    label: string;
    value: string;
  };

  let matricesOptions: TOptions[] = [],
    stationOptions: TOptions[] = [],
    organizationOptions: TOptions[] = [],
    waterBodyOptions: TOptions[] = [],
    analyteOptions: TOptions[] = [];

  if (!searchSampleFormFieldsLoading && !searchSampleFormFieldsError) {
    const {
      uniqueMatrices = [],
      uniqueWaterBodies = [],
      uniqueStationNames = [],
      uniqueOrganizations = [],
    } = searchSampleFormFieldData?.formFieldValues || {};

    matricesOptions = createFormDropdownObject(uniqueMatrices);
    stationOptions = createFormDropdownObject(uniqueStationNames);
    organizationOptions = createFormDropdownObject(uniqueOrganizations);
    waterBodyOptions = createFormDropdownObject(uniqueWaterBodies);
    analyteOptions = createFormDropdownObject(['Silver', 'Gold']);
  }

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
                helperText="Organization"
                name="organization"
                label="Organization"
                options={organizationOptions}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ControlledSelectField
                control={control}
                helperText="Water Body"
                name="waterBody"
                label="Water Body"
                options={waterBodyOptions}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ControlledSelectField
                control={control}
                helperText="Analyte"
                name="analyte"
                label="Analyte"
                options={analyteOptions}
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
