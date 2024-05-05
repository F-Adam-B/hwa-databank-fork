import { Autocomplete, Box, Checkbox, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

// Move styles to a constant outside the component to avoid re-creation on each render
const checkboxStyle = { marginRight: 8 };
const autocompleteStyle = { width: 500 };

const ControlledAutocompleteField = ({
  control,
  label,
  name,
  multiple,
  options,
  placeholder,
}: {
  control: Control<any>;
  label: string;
  name: string;
  multiple?: boolean;
  options: {}[];
  placeholder?: string;
}) => {
  return (
    <Box>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field} // Spread the field props directly to the Autocomplete to ensure all necessary hooks are passed
            multiple={multiple}
            onChange={(_, data) =>
              field.onChange(
                data.map((option: { value: string }) => ({
                  analyteName: option.value,
                  characteristics: [],
                }))
              )
            }
            options={options}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  style={checkboxStyle}
                  checked={selected}
                  onChange={(event) => {
                    const newValue = event.target.checked
                      ? [
                          ...field.value,
                          { analyteName: option.value, characteristics: [] },
                        ]
                      : field.value.filter(
                          (v: { analyteName: string }) =>
                            v.analyteName !== option.value
                        );
                    field.onChange(newValue);
                  }}
                />
                {option.title}
              </li>
            )}
            sx={autocompleteStyle}
            renderInput={(params) => (
              <TextField {...params} label={label} placeholder={placeholder} />
            )}
          />
        )}
      />
    </Box>
  );
};

export default ControlledAutocompleteField;
