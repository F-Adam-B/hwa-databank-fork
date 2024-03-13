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
  Dialog,
  DialogActions,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import {
  CircularProgressIndicator,
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
  sampleComment?: string;
  dateCollected: string | null;
  elevation?: string;
  eventId: string;
  location: {
    coordinates: [string, string];
    county: string;
    elevation: string;
    elevationToGrade?: string;
    locationDescription: string;
  };
  matrix: string;
  preservationMethods?: [];
  project: {
    labId: string;
    labName: string;
    projectName: string;
    organization: string;
  };
  sampler?: string;
  sampleNumber: string;
  sampleTags?: [];
  sampleType: string;
  stationName: string;
  stationNameTwo?: string;
  timeCollected: string | null;
  waterBody: string;
  waterBodyId: string;
  waterCode?: string;
  watershed: string;
  watershedReport?: string;
};

const defaultValues: TSampleForm = {
  analytesTested: [],
  sampleComment: '',
  dateCollected: null,
  elevation: '',
  eventId: '',
  location: {
    coordinates: ['', ''],
    county: '',
    elevation: '',
    elevationToGrade: '',
    locationDescription: '',
  },
  matrix: '',
  project: {
    labId: '',
    labName: '',
    projectName: '',
    organization: '',
  },
  sampleNumber: '',
  sampleTags: [],
  sampleType: '',
  stationName: '',
  stationNameTwo: '',
  timeCollected: null,
  waterBody: '',
  waterBodyId: '',
  waterCode: '',
  watershed: '',
  watershedReport: '',
};

const SampleForm = () => {
  const [
    getAnalyteCharacteristics,
    {
      called: analytesWithCharacteristicsQueryCalled,
      loading: analytesWithCharacteristicsLoading,
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

  const onSubmit = (formData: any) => {
    // need to shape formData to WaterSample schema
    console.log(formData, 'formData');
  };

  const handleSelectCharacteristics = async () => {
    try {
      const listOfAnalyteNames = getValues('analytesTested').map(
        (analyte) => analyte.analyteName
      );
      await getAnalyteCharacteristics({
        variables: {
          listOfAnalyteNames,
        },
      });

      setOpenCharacteristicsFormDialog(true);
    } catch (error: any) {
      console.error('Error fetching analyte characteristics:', error);
    }
  };

  if (error) return <>Error with form: {error}</>;
  if (getAnalyteCharacteristicsError)
    return (
      <>Error retrieving characteristics: {getAnalyteCharacteristicsError}</>
    );

  // if (
  //   analytesWithCharacteristicsQueryCalled &&
  //   analytesWithCharacteristicsLoading
  // )
  //   return <CircularProgressIndicator />;

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
                name="project.projectName"
              />

              <ControlledInputField
                control={control}
                label="Event ID"
                name="eventId"
              />
              <ControlledInputField
                control={control}
                label="Sample ID"
                name="sampleNumber"
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
                name="stationNameTwo"
                options={stationOptions}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <ControlledInputField
                control={control}
                label="Location Description"
                name="location.locationDescription"
              />
              <Controller
                control={control}
                name="location.coordinates"
                render={({ field }) => {
                  const { onChange, value, ...restField } = field;

                  const handleLatitudeChange = (e: {
                    target: { value: string };
                  }) => {
                    onChange([e.target.value, value[1]]);
                  };

                  return (
                    <TextField
                      {...restField}
                      label="Latitude"
                      onChange={handleLatitudeChange}
                      placeholder="Latitude"
                      type="text"
                      value={value[0] ?? ''} // Use value at index 0 for latitude
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="location.coordinates"
                render={({ field }) => {
                  const { onChange, value, ...restField } = field;

                  const handleLongitudeChange = (e: {
                    target: { value: string };
                  }) => {
                    onChange([value[0], e.target.value]);
                  };

                  return (
                    <TextField
                      {...restField}
                      label="Longitude"
                      onChange={handleLongitudeChange}
                      placeholder="Longitude"
                      type="text"
                      value={value[1] ?? ''} // Use value at index 0 for latitude
                    />
                  );
                }}
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
                name="location.elevationToGrade"
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
                name="waterBodyId"
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
                name="project.labId"
              />
              <ControlledInputField
                control={control}
                label="Lab Name"
                name="project.labName"
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
                name="sampleComment"
                rows={4}
              />
            </Grid>
          </Grid>
          <Button disabled={!isDirty} type="submit">
            Submit
          </Button>
        </form>
        <Dialog fullScreen open={openCharacteristicsFormDialog}>
          <CharacteristicsForm
            apiAnalytes={
              analytesWithCharacteristicsData?.analytesCharacteristics
            }
            control={control}
            handleClose={setOpenCharacteristicsFormDialog}
          />
        </Dialog>
      </Card>
      <DevTool control={control} />
    </Box>
  );
};

export default SampleForm;
