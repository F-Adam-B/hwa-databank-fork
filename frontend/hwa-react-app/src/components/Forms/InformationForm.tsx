import { Controller, useFormContext } from 'react-hook-form';
import { Box, Card, Typography } from '@mui/material';
import { ControlledInputField } from '../index';

const defaultValues: { organizationName: string; projectName: string } = {
  organizationName: '',
  projectName: '',
};

const InformationForm = () => {
  const { control } = useFormContext();

  return (
    <Box>
      <Typography variant="h5">Project Information</Typography>
      <Card>
        <Controller
          name="organizationName"
          control={control}
          render={({ field }) => (
            <ControlledInputField
              control={control}
              label="Organization Name"
              {...field}
            />
          )}
        />
        <Controller
          name="projectName"
          control={control}
          render={({ field }) => (
            <ControlledInputField
              control={control}
              label="Project Type"
              {...field}
            />
          )}
        />
      </Card>
    </Box>
  );
};

export default InformationForm;
