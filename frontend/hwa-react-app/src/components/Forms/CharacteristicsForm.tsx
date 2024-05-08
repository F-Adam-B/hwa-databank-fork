import { useCallback, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  TextField,
  Typography,
} from '@mui/material';
import {
  AnalyteType,
  TCharacteristicsFormProps,
  TCharField,
} from '../../types';

const defaultAnalyte: AnalyteType = {
  analyteName: '',
  characteristics: [{ name: '', value: '' }],
};

const CharacteristicsForm = ({
  apiAnalytes = [defaultAnalyte],
  control: sampleFormControl,
  handleClose,
  open,
}: TCharacteristicsFormProps) => {
  const { control, register, getValues, reset } = useForm({
    defaultValues: {
      selectedAnalytes: apiAnalytes,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'selectedAnalytes',
  });

  useEffect(() => {
    reset({
      selectedAnalytes: apiAnalytes,
    });
  }, [apiAnalytes, reset]);

  const { replace } = useFieldArray({
    control: sampleFormControl,
    name: 'analytesTested',
  });

  const handleUpdateSampleForm = useCallback(() => {
    const characteristicFormValues = getValues('selectedAnalytes');
    replace(characteristicFormValues);
    handleClose(false);
  }, [getValues, replace, handleClose]);

  return (
    <Dialog fullScreen open={open}>
      <Box>
        <Card>
          {fields.map((analyte: TCharField, parentIndex: number) => (
            <div key={analyte.id}>
              <Typography variant="h5">{analyte.analyteName}</Typography>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
              >
                <input
                  key={analyte.analyteName}
                  hidden
                  {...register(
                    `selectedAnalytes.${parentIndex}.analyteName` as const
                  )}
                  defaultValue={analyte.analyteName}
                />
                {analyte.characteristics.map((characteristic, charIndex) => (
                  <TextField
                    key={`char-${charIndex}`}
                    {...register(
                      `selectedAnalytes.${parentIndex}.characteristics.${charIndex}.value`
                    )}
                    placeholder={characteristic.name}
                    label={characteristic.name}
                    defaultValue={characteristic.value} // Set default value here
                  />
                ))}
              </Box>
            </div>
          ))}
          <DialogActions>
            <Button onClick={() => handleClose(false)}>Cancel</Button>
            <Button onClick={handleUpdateSampleForm}>Save</Button>
          </DialogActions>
        </Card>
      </Box>
      <DevTool control={control} />
    </Dialog>
  );
};

export default CharacteristicsForm;
