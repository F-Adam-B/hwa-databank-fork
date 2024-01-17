import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

const initialState = {
  _id: null,
  createdAt: null,
  elementsTested: [
    {
      description: '',
      elementName: '',
      value: '',
    },
  ],
  location: {
    coordinates: ['', ''],
    county: '',
    type: '',
  },
  matrix: '',
  project: {
    _id: null,
    organization: '',
    projectName: '',
  },
  sampleDate: null,
  sampleNumber: '',
  sampleTime: null,
  stationName: '',
  stationNameTwo: '',
  updatedAt: null,
};

export {};
