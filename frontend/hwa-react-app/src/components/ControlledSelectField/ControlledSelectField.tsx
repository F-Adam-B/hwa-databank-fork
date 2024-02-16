import * as React from 'react';
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
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface FormSelectProps {
  name: string;
  control: Control<any>;
  defaultValue?: string;
  helperText?: string;
  id?: string;
  label?: string;
  options: {
    label: string;
    value: string;
  }[];
}

const SelectTextFields = ({
  control,
  defaultValue = '',
  helperText = '',
  id,
  label,
  name,
  options,
}: FormSelectProps) => {
  return (
    <Box
      component="div"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TextField
            {...field}
            id={id}
            select
            helperText={helperText}
            variant="standard"
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </Box>
  );
};

export default SelectTextFields;
