import React, { useState } from 'react';
import {
  Controller,
  useFieldArray,
  useForm,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';
import {
  Box,
  Button,
  Card,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { ControlledInputField } from '../index';
import { Analyte, Characteristic } from './SampleForm';

type TCharacteristicsFormProps = {
  control: any;
  apiAnalytes: {
    analyteName: string;
    characteristics: Characteristic[];
  }[];
  register: any;
  handleCharacteristicStateChange: any;
};

type Field = {
  id?: string;
  analyteName: string;
  characteristics: Characteristic[];
  onChange?: any;
};

const defaultAnalyte: Analyte = {
  analyteName: '',
  characteristics: [{ name: '', value: '' }],
};

const CharacteristicsForm = ({
  apiAnalytes = [defaultAnalyte],
  control,
  handleCharacteristicStateChange,
  register,
}: TCharacteristicsFormProps) => {
  // Function to handle the input change for characteristics
  const handleCharacteristicChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    analyteName: string,
    charIndex: number,
    parentIndex: number
  ): void => {
    const newCharValue = e.target.value;
    handleCharacteristicStateChange((prevState: Analyte[]) => {
      const updatedAnalytes = [...prevState];

      const updatedCharacteristics = updatedAnalytes[
        parentIndex
      ].characteristics.map((characteristic: Characteristic, idx: number) =>
        idx === charIndex
          ? { ...characteristic, value: newCharValue }
          : characteristic
      );

      updatedAnalytes[parentIndex] = {
        analyteName,
        characteristics: updatedCharacteristics,
      };

      return updatedAnalytes;
    });
  };

  return (
    <Box>
      <Card>
        {apiAnalytes.map((analyte: Field, parentIndex: number) => (
          <div key={analyte.id}>
            <Typography variant="h5">{analyte.analyteName}</Typography>
            <Box
              component="div"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
            >
              {analyte.characteristics.map(
                (characteristic: Characteristic, charIndex) => {
                  return (
                    <TextField
                      key={`char-${charIndex}`}
                      type="text"
                      value={characteristic.value}
                      onChange={(e) =>
                        handleCharacteristicChange(
                          e,
                          analyte.analyteName,
                          charIndex,
                          parentIndex
                        )
                      }
                      placeholder={characteristic.name}
                      label={characteristic.name}
                    />
                  );
                }
              )}
            </Box>
          </div>
        ))}
      </Card>
    </Box>
  );
};

export default CharacteristicsForm;
