import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormHelperText } from '@mui/material';

const ControlledDateField = ({
  control,
  label,
  name,
  required,
}: {
  control: Control<any>;
  label: string;
  name: string;
  required?: boolean;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required ? 'This field is required' : false }}
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <>
          <DatePicker
            {...field}
            label={label}
            onChange={(newValue) => {
              onChange(newValue);
            }}
            // error={Boolean(fieldState.error)} // This will indicate an error visually on the UI
            // helperText={fieldState.error ? fieldState.error.message : null} // Display the error mess
          />

          {error && <FormHelperText>{error.message}</FormHelperText>}
        </>
      )}
    />
  );
};

export default ControlledDateField;
