import React, { useState } from 'react';
import {
  Controller,
  useFieldArray,
  useForm,
  Resolver,
  SubmitHandler,
  useFormContext,
  Control,
} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { ControlledInputField } from '../index';
import { AnalyteType, CharacteristicType } from '../../types';

type TCharacteristicsFormProps = {
  apiAnalytes: {
    analyteName: string;
    characteristics: CharacteristicType[];
  }[];
  control?: Control<any>;
  handleClose: (boolean: boolean) => void;
};

type Field = {
  id?: string;
  analyteName: string;
  characteristics: CharacteristicType[];
  onChange?: any;
};

const defaultAnalyte: AnalyteType = {
  analyteName: '',
  characteristics: [{ name: '', value: '' }],
};

const CharacteristicsForm = ({
  apiAnalytes = [defaultAnalyte],
  control: sampleFormControl,
  handleClose,
}: TCharacteristicsFormProps) => {
  const { control, register, getValues } = useForm({
    defaultValues: {
      selectedAnalytes: [...apiAnalytes],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'selectedAnalytes',
  });

  const { replace } = useFieldArray({
    control: sampleFormControl,
    name: 'analytesTested',
  });

  const handleUpdateSampleForm = () => {
    const characteristicFormValues = getValues('selectedAnalytes');
    replace(characteristicFormValues);
    handleClose(false);
  };

  return (
    <Box>
      <Card>
        {fields.map((analyte: Field, parentIndex: number) => (
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
              {analyte.characteristics.map(
                (characteristic: CharacteristicType, charIndex) => {
                  return (
                    <Controller
                      defaultValue={characteristic.value}
                      key={
                        `selectedAnalytes.${parentIndex}.characteristics.${charIndex}.value` as const
                      }
                      name={
                        `selectedAnalytes.${parentIndex}.characteristics.${charIndex}.value` as const
                      }
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          key={`char-${charIndex}`}
                          placeholder={characteristic.name}
                          label={characteristic.name}
                        />
                      )}
                    />
                  );
                }
              )}
            </Box>
          </div>
        ))}
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
          <Button onClick={handleUpdateSampleForm}>Save</Button>
        </DialogActions>
      </Card>
    </Box>
  );
};

export default CharacteristicsForm;
