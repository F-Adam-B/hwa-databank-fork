import { useContext, memo } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Box, Card, Typography, Grid, Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { DropdownOptionsContext } from '../../Providers/DropdownSelectContext';
import {
  ControlledAutocompleteField,
  ControlledDateField,
  ControlledSelectField,
  MapBox,
} from '../index';
import { GET_SAMPLES } from '../../graphql/queries/sampleQueries';
import { SearchFormInput } from '../../types';

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

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues,
  });

  const [getSample, { loading, data }] = useLazyQuery(GET_SAMPLES);

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
      {!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? (
        <DevTool control={control} />
      ) : null}
    </Box>
  );
};

export default memo(SearchForm);
