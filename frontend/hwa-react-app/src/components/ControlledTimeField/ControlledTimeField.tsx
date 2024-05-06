import { Control, Controller } from 'react-hook-form';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const ControlledTimeField = ({
  control,
  label,
  name,
}: {
  control: Control<any>;
  label: string;
  name: string;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TimePicker {...field} label={label} onChange={field.onChange} />
      )}
    />
  );
};

export default ControlledTimeField;
