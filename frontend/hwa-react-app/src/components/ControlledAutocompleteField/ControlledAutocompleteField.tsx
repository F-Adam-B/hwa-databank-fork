import { Autocomplete, Box, Checkbox, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

type MyComponentProps = {
  control: Control<any>;
  id?: string;
  label?: string;
  name: string;
  options: { title: string; value: string }[];
  placeholder: string;
};

// Define a constant for the checkbox style to prevent re-creation on each render
const checkboxStyle = { marginRight: 8 };

const ControlledAutocompleteField = ({
  control,
  label,
  id,
  name,
  options,
  placeholder,
}: MyComponentProps) => {
  return (
    <Box component="div">
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <Autocomplete
            multiple
            onChange={(e, data) => field.onChange(data)}
            options={options}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title} // removed optional chaining as `title` is guaranteed by MyComponentProps
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox {...field} style={checkboxStyle} checked={selected} />
                {option.title} {/* removed optional chaining */}
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
