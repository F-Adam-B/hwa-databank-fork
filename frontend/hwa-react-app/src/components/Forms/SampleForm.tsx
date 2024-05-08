import { useCallback, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Card,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import {
  ControlledAutocompleteField,
  ControlledInputField,
  ControlledSelectField,
} from '../index';
import ControlledDateField from '../ControlledDateField/ControlledDateField';
import ControlledTimeField from '../ControlledTimeField/ControlledTimeField';
import { GET_ANALYTE_CHARACTERISTICS } from '../../apollo/queries/analyteQueries';
import { ADD_SAMPLE_MUTATION } from '../../apollo/mutations/sampleMutations';
import CharacteristicsForm from './CharacteristicsForm';
import { TSampleForm } from '../../types';
import { cleanFormData } from '../../utilities/dataTransformations';
import { GET_SEARCH_SAMPLE_FORM_FIELDS } from '../../apollo/queries/sampleQueries';

const defaultValues: TSampleForm = {
  analytesTested: [],
  sampleComment: '',
  dateCollected: '',
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
  sampleTag1: '',
  sampleTag2: '',
  sampleTag3: '',
  sampleTag4: '',
  sampleTag5: '',
  sampleType: '',
  stationName: '',
  stationNameTwo: '',
  timeCollected: '',
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
  ] = useLazyQuery(GET_ANALYTE_CHARACTERISTICS);

  const [
    addSampleMutation,
    {
      data: addSampleMutationData,
      loading: addSampleMutationLoading,
      error: addSampleMutationError,
    },
  ] = useMutation(ADD_SAMPLE_MUTATION);

  const {
    data: searchSampleFormFieldData,
    loading: searchSampleFormFieldsLoading,
    error: searchSampleFormFieldsError,
  } = useQuery(GET_SEARCH_SAMPLE_FORM_FIELDS);

  const {
    matricesOptions,
    stationOptions,
    organizationOptions,
    waterBodyOptions,
    analyteOptions,
  } = searchSampleFormFieldData;

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

  const onSubmit = useCallback(
    async (formData: TSampleForm) => {
      const reshapedFormData = cleanFormData(formData);
      try {
        await addSampleMutation({
          variables: { sampleFormValues: { id: '123', ...reshapedFormData } },
        });
      } catch (error) {
        console.error('Error adding sample: ', error);
      }
    },
    [cleanFormData]
  );

  const handleSelectCharacteristics = useCallback(async () => {
    try {
      const names = getValues('analytesTested').map(
        (analyte) => analyte.analyteName
      );
      await getAnalyteCharacteristics({
        variables: {
          names,
        },
      });

      setOpenCharacteristicsFormDialog(true);
    } catch (error: any) {
      console.error('Error fetching analyte characteristics:', error);
    }
  }, [getValues, getAnalyteCharacteristics, setOpenCharacteristicsFormDialog]);

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
                required={true}
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
                name="project.organization"
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
                rules={{
                  validate: {
                    pattern: (value: any) =>
                      value.every((val: string) =>
                        /^[+-]?\d*(\.\d*)?$/.test(val)
                      ) || 'Invalid Latitude format.',
                  },
                }}
                render={({ field, fieldState }) => {
                  const { onChange, value, ...restField } = field;
                  const handleLatitudeChange = (e: {
                    target: { value: string };
                  }) => {
                    const inputValue = e.target.value;
                    onChange([inputValue, value ? value[1] : '']);
                  };

                  return (
                    <>
                      <TextField
                        {...restField}
                        error={!!fieldState.error?.message}
                        label="Latitude"
                        onChange={handleLatitudeChange}
                        placeholder="Required"
                        required
                        type="text"
                        value={value ? value[0] : ''}
                      />
                      {fieldState.error && (
                        <FormHelperText>
                          {fieldState.error.message}
                        </FormHelperText>
                      )}
                    </>
                  );
                }}
              />
              <Controller
                control={control}
                name="location.coordinates"
                rules={{
                  validate: {
                    pattern: (value: any) =>
                      value.every((val: string) =>
                        /^[+-]?\d*(\.\d*)?$/.test(val)
                      ) || 'Invalid Longitude format.',
                  },
                }}
                render={({ field, fieldState }) => {
                  const { onChange, value, ...restField } = field;

                  const handleLongitudeChange = (e: {
                    target: { value: string };
                  }) => {
                    let inputValue = e.target.value;
                    onChange([value ? value[0] : '', inputValue]);
                  };

                  return (
                    <Box>
                      <TextField
                        {...restField}
                        label="Longitude"
                        error={!!fieldState.error?.message}
                        onChange={handleLongitudeChange}
                        placeholder="Required"
                        required={true}
                        type="text"
                        value={value ? value[1] : ''}
                      />
                      {fieldState.error && (
                        <FormHelperText>
                          {fieldState.error.message}
                        </FormHelperText>
                      )}
                    </Box>
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
              <ControlledAutocompleteField
                control={control}
                label="Preservation Methods"
                name="preservationMethods"
                options={[{ title: 'Preservation1', value: 'value1' }]}
              />
              <Grid item xs={12} md={12}>
                <ControlledInputField
                  control={control}
                  label="Sample Tag 1"
                  name="sampleTag1"
                />
                <ControlledInputField
                  control={control}
                  label="Sample Tag 2"
                  name="sampleTag2"
                />
                <ControlledInputField
                  control={control}
                  label="Sample Tag 3"
                  name="sampleTag3"
                />
                <ControlledInputField
                  control={control}
                  label="Sample Tag 4"
                  name="sampleTag4"
                />
                <ControlledInputField
                  control={control}
                  label="Sample Tag 5"
                  name="sampleTag5"
                />
              </Grid>
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
        <CharacteristicsForm
          apiAnalytes={analytesWithCharacteristicsData?.analytesCharacteristics}
          control={control}
          handleClose={setOpenCharacteristicsFormDialog}
          open={openCharacteristicsFormDialog}
        />
      </Card>
      {/* <DevTool control={control} /> */}
    </Box>
  );
};

export default SampleForm;
