import React from 'react';
import {
  Path,
  Control,
  Controller,
  useForm,
  SubmitHandler,
  useFormContext,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { render } from '@testing-library/react';
import { FormHelperText } from '@mui/material';

interface ControlledDateFieldProps {
  control: Control<any>;
  label?: string;
  name: string;
  value?: Date | null;
  onChange?: any;
  required?: boolean;
}

const ControlledDateField = ({
  control,
  label,
  name,
  onChange,
  required,
}: ControlledDateFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required ? 'This field is required' : false }}
      render={({ field, fieldState }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...field}
            label={label}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            // error={Boolean(fieldState.error)} // This will indicate an error visually on the UI
            // helperText={fieldState.error ? fieldState.error.message : null} // Display the error mess
          />

          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </LocalizationProvider>
      )}
    />
  );
};

export default ControlledDateField;
