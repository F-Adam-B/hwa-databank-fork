import { Autocomplete, Box, Checkbox, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { TOptions } from '../Forms/SearchForm';

type MyComponentProps = {
  control: Control<any>;
  id?: string;
  label?: string;
  multiple?: boolean;
  name: string;
  options: TOptions[];
  placeholder?: string;
};

const checkboxStyle = { marginRight: 8 };

const ControlledAutocompleteField = ({
  control,
  label,
  id,
  multiple,
  name,
  options,
  placeholder,
}: MyComponentProps) => {
  return (
    <Box component="div">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            multiple={multiple}
            onChange={(e, data) =>
              field.onChange(
                Array.isArray(data)
                  ? data.map((a) => ({
                      analyteName: a.value,
                      characteristics: [],
                    }))
                  : []
              )
            }
            options={options}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  {...field}
                  style={checkboxStyle}
                  checked={selected}
                  onChange={() => {
                    const newValue = selected
                      ? field.value.filter(
                          (v: { analyteName: string }) =>
                            v.analyteName !== option.value
                        )
                      : [
                          ...field.value,
                          { analyteName: option.value, characteristics: [] },
                        ];
                    field.onChange(newValue);
                  }}
                />
                {option.title}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...field}
                {...params}
                label={label}
                placeholder={placeholder}
              />
            )}
          />
        )}
      />
    </Box>
  );
};

export default ControlledAutocompleteField;
