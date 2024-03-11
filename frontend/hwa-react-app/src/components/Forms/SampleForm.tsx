import React, { useContext, useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { DropdownOptionsContext } from '../../Providers/DropdownSelectContext';
import {
  Controller,
  useFieldArray,
  useForm,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';
import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import {
  ControlledAutocompleteField,
  ControlledInputField,
  ControlledSelectField,
  SimpleDialog,
} from '../index';
import ControlledDateField from '../ControlledDateField/ControlledDateField';
import ControlledTimeField from '../ControlledTimeField/ControlledTimeField';
import { DevTool } from '@hookform/devtools';
import { GET_ANALYTE_CHARACTERISTICS_QUERY } from '../../graphql/queries/analyteQueries';
import CharacteristicsForm from './CharacteristicsForm';

type TCharacteristicsFormProps = {
  control: any;
  analytes: {
    __typename: string;
    analyteName: string;
    characteristics: {
      name: string;
    }[];
  }[];
  register: any;
};

export interface Characteristic {
  name: string;
  value: string;
}

export interface Analyte {
  analyteName: string;
  characteristics: Characteristic[];
}

type TSampleForm = {
  analytesTested: {
    analyteName: string;
  }[];
  comments?: string;
  dateCollected: string | null;
  elevation?: string;
  elevationToGrade?: string;
  eventID: number | null;
  labID: number | null;
  labName: string;
  latitude: string;
  longitude: string;
  locationDescription?: string;
  matrix: string;
  organization: string;
  projectName: string;
  sampleID: number | null;
  sampleType: string;
  stationName: string;
  stationName2?: string;
  timeCollected: string | null;
  waterBody: string;
  waterBodyID: string;
  waterCode?: string;
  watershed: string;
  watershedReport?: string;
  preservationMethods?: [];
  sampleTags?: [];
};

const defaultValues: TSampleForm = {
  analytesTested: [],
  comments: '',
  dateCollected: null,
  elevation: '',
  elevationToGrade: '',
  eventID: null,
  labID: null,
  labName: '',
  latitude: '',
  longitude: '',
  locationDescription: '',
  matrix: '',
  organization: '',
  preservationMethods: [],
  projectName: '',
  sampleTags: [],
  sampleType: '',
  sampleID: null,
  stationName: '',
  stationName2: '',
  timeCollected: null,
  waterBody: '',
  waterBodyID: '',
  waterCode: '',
  watershed: '',
  watershedReport: '',
};

const SampleForm = () => {
  const [
    getAnalyteCharacteristics,
    {
      loading,
      error: getAnalyteCharacteristicsError,
      data: analytesWithCharacteristicsData,
    },
  ] = useLazyQuery(GET_ANALYTE_CHARACTERISTICS_QUERY);

  const {
    matricesOptions,
    stationOptions,
    organizationOptions,
    waterBodyOptions,
    analyteOptions,
  } = useContext(DropdownOptionsContext);

  const [error, setError] = useState('');
  const [openCharacteristicsFormDialog, setOpenCharacteristicsFormDialog] =
    useState(false);

  const [analytesToUpload, setAnalytesToUpload] = useState<Analyte[]>([]);

  const {
    control,
    handleSubmit,
    getValues,
    register,
    watch,
    formState: { isDirty },
  } = useForm({
    defaultValues,
  });

  const { fields, replace, update } = useFieldArray({
    control,
    name: 'analytesTested',
  });

  const onSubmit = (formData: any) => {
    // need to shape formData to WaterSample schema
    console.log(formData, 'formData');
  };

  const handleSelectCharacteristics = async () => {
    try {
      const listOfAnalyteNames = getValues('analytesTested').map(
        (analyte) => analyte.analyteName
      );
      const response = await getAnalyteCharacteristics({
        variables: {
          listOfAnalyteNames,
        },
      });

      setAnalytesToUpload(response.data.analytesCharacteristics);
      setOpenCharacteristicsFormDialog(true);
    } catch (error: any) {
      console.error('Error fetching analyte characteristics:', error);
    }
  };

  const handleCharacteristicsSave = () => {
    replace(analytesToUpload);
  };

  if (error) return <>Error with form: {error}</>;
  if (getAnalyteCharacteristicsError)
    return (
      <>Error retrieving characteristics: {getAnalyteCharacteristicsError}</>
    );

  return (
    <Box>
      <Card>
        <Typography variant="h5">Sample Form</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
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
            </Grid>
            <Grid item xs={12} md={12}>
              {/* need ability to add new */}
              <ControlledSelectField
                control={control}
                label="Organization"
                helperText="Organization"
                name="organization"
                options={organizationOptions}
              />
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
            <Grid item xs={12} md={12}>
              {/* need ability to add new */}
              <ControlledSelectField
                control={control}
                helperText="Station Name"
                label="Station Name"
                name="stationName"
                options={stationOptions}
              />
              <ControlledSelectField
                control={control}
                helperText="Station Name 2"
                label="Station Name 2"
                name="stationName2"
                options={stationOptions}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <ControlledInputField
                control={control}
                label="Location Description"
                name="locationDescription"
              />
              <ControlledInputField
                control={control}
                label="Latitude"
                name="latitude"
              />
              <ControlledInputField
                control={control}
                label="Longitude"
                name="longitude"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <ControlledInputField
                control={control}
                label="Elevation (ft.)"
                name="elevation"
              />
              <ControlledInputField
                control={control}
                label="Elevation to grade (ft.)"
                name="elevationToGrade"
              />
              <ControlledInputField
                control={control}
                label="Sample Type"
                name="sampleType"
              />
            </Grid>
            <Grid item>
              <ControlledSelectField
                control={control}
                label="Matrix"
                helperText="Matrix"
                name="matrix"
                options={matricesOptions}
              />
              {/* need ability to add new */}
              <ControlledSelectField
                control={control}
                label="Water Body"
                helperText="Water Body"
                name="waterBody"
                options={waterBodyOptions}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <ControlledInputField
                control={control}
                label="Water Body ID"
                name="waterBodyID"
              />
              <ControlledInputField
                control={control}
                label="Water Code"
                name="waterCode"
              />
              <ControlledInputField
                control={control}
                label="Watershed"
                name="watershed"
              />
              <ControlledInputField
                control={control}
                label="Watershed Report"
                name="watershedReport"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <ControlledAutocompleteField
                control={control}
                label="Preservation Methods"
                name="preservationMethods"
                options={[{ title: 'Preservation1', value: 'value1' }]}
              />
              <ControlledAutocompleteField
                control={control}
                label="Sample Tags"
                name="sampleTags"
                options={[{ title: 'Preservation2', value: 'value2' }]}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <ControlledInputField
                control={control}
                label="Lab ID"
                name="labID"
              />
              <ControlledInputField
                control={control}
                label="Lab Name"
                name="labName"
              />
            </Grid>
            <Grid item md={12}>
              <ControlledAutocompleteField
                control={control}
                label="Analytes Tested"
                multiple={true}
                name="analytesTested"
                placeholder="Analytes Tested"
                options={analyteOptions}
              />
              <Button disabled={!isDirty} onClick={handleSelectCharacteristics}>
                Select Characteristics
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <ControlledInputField
                control={control}
                fullWidth={true}
                label="Comments"
                multiline={true}
                name="comments"
                rows={4}
              />
            </Grid>
          </Grid>
          <Button disabled={!isDirty} type="submit">
            Submit
          </Button>
        </form>
      </Card>
      <SimpleDialog
        fullScreen={true}
        handleSave={handleCharacteristicsSave}
        onClose={() => setOpenCharacteristicsFormDialog(false)}
        open={openCharacteristicsFormDialog}
        children={
          <CharacteristicsForm
            control={control}
            apiAnalytes={
              analytesWithCharacteristicsData?.analytesCharacteristics
            }
            handleCharacteristicStateChange={setAnalytesToUpload}
            register={register}
          />
        }
      />
      <DevTool control={control} /> {/* set up the dev tool */}
    </Box>
  );
};

export default SampleForm;
