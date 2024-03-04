import React, { useMemo, useState } from 'react';
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
import {
  ControlledAutocompleteField,
  ControlledDateField,
  ControlledInputField,
  ControlledSelectField,
  MapBox,
} from '../index';
import {
  GET_ANALYTES,
  GET_SAMPLES,
  GET_SEARCH_SAMPLE_FORM_FIELDS,
} from '../../graphql/queries/sampleQueries';

import { createFormDropdownObject, getUniqueValues } from '../../utilities';

type SearchFormInput = {
  fromDate: string | null;
  toDate: string | null;
  matrix: string;
  organization: string;
  waterBody: string;
  analytes: string[];
};

const defaultValues: SearchFormInput = {
  fromDate: null,
  toDate: null,
  matrix: '',
  organization: '',
  waterBody: '',
  analytes: [],
};

const SearchForm = () => {
  const {
    loading: searchSampleFormFieldsLoading,
    error: searchSampleFormFieldsError,
    data: searchSampleFormFieldData,
  } = useQuery(GET_SEARCH_SAMPLE_FORM_FIELDS, {
    fetchPolicy: 'cache-and-network',
  });

  const { loading: analytesLoading, data: analytesData } =
    useQuery(GET_ANALYTES);

  type TOptions = {
    [key: string]: string;
    value: string;
  };

  let matricesOptions: TOptions[] = [],
    stationOptions: TOptions[] = [],
    organizationOptions: TOptions[] = [],
    waterBodyOptions: TOptions[] = [],
    analyteOptions: any;

  analyteOptions = useMemo(() => {
    if (analytesData && analytesData.analytes.length) {
      const arrayOfAnalyteValues = analytesData.analytes.map(
        (analyte: { analyteName: string; __typename: string }) => {
          return analyte?.analyteName;
        }
      );

      const flatArrayOfAnalyteValues = getUniqueValues(
        arrayOfAnalyteValues.flat()
      );

      return createFormDropdownObject(flatArrayOfAnalyteValues, 'title');
    }
    return [];
  }, [analytesData]);

  if (!searchSampleFormFieldsLoading && !searchSampleFormFieldsError) {
    const {
      uniqueMatrices = [],
      uniqueWaterBodies = [],
      uniqueStationNames = [],
      uniqueOrganizations = [],
    } = searchSampleFormFieldData?.formFieldValues || {};

    matricesOptions = createFormDropdownObject(uniqueMatrices, 'label');
    stationOptions = createFormDropdownObject(uniqueStationNames, 'label');
    organizationOptions = createFormDropdownObject(
      uniqueOrganizations,
      'label'
    );
    waterBodyOptions = createFormDropdownObject(uniqueWaterBodies, 'label');
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
              <ControlledAutocompleteField
                control={control}
                name="analytes"
                label="Analytes"
                options={analyteOptions}
                placeholder="Analytes"
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
