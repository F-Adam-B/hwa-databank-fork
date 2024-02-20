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
import {
  Box,
  Card,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
  TextFieldProps,
} from '@mui/material';

interface FormInputProps<TFieldValues extends FieldValues> {
  defaultValue?: TFieldValues[Path<TFieldValues>];
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions;
  label?: string;
  helperText?: string;
  // No default value assignments in interface definitions
  // Only the types are defined here
}

const ControlledInputField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  rules = {},
  defaultValue,
  helperText,
  ...otherProps
}: FormInputProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          error={!!error}
          helperText={error ? error.message : helperText}
          {...otherProps}
        />
      )}
    />
  );
};

export default ControlledInputField;