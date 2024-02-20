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
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { render } from '@testing-library/react';

interface ControlledDateFieldProps {
  control: Control<any>;
  label?: string;
  name: string;
  value?: Date | null;
  onChange?: any;
}

const ControlledTimeField = ({
  control,
  label,
  name,
  onChange,
}: ControlledDateFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            {...field}
            label={label}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default ControlledTimeField;
