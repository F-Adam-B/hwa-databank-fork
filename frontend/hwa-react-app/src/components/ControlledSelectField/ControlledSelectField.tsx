import { useState } from 'react';
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
import { Box, InputAdornment, IconButton, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Clear, ExpandMore } from '@mui/icons-material';

interface FormSelectProps {
  name: string;
  control: Control<any>;
  defaultValue?: string;
  helperText?: string;
  id?: string;
  label?: string;
  options: {
    label?: string;
    value?: string;
  }[];
}

const ControlledSelectField = ({
  control,
  defaultValue = '',
  helperText = '',
  id,
  label,
  name,
  options,
}: FormSelectProps) => {
  const [open, setOpen] = useState(false);

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
            SelectProps={{
              open: open,
              onOpen: () => setOpen(true),
              onClose: () => setOpen(false),
              IconComponent: () => {
                const showExpandIcon = !field.value ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={(event) => {
                        event.stopPropagation();
                        setOpen(!open);
                      }}
                    >
                      <ExpandMore />
                    </IconButton>
                  </InputAdornment>
                ) : null;
                return showExpandIcon;
              },
            }}
            InputProps={{
              endAdornment: field.value ? (
                <InputAdornment position="end">
                  <IconButton onClick={() => field.onChange('')} edge="end">
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
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

export default ControlledSelectField;
