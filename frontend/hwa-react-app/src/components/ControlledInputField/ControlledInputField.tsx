import React from 'react';
import {
  Controller,
  useForm,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';
import {
  Box,
  Card,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const ControlledInputField = (props: any) => {
  return (
    <>
      <TextField variant="outlined" {...props} />
    </>
  );
};

export default ControlledInputField;
