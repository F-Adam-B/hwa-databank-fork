import mongoose from 'mongoose';

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

export const analyteSchema = new Schema(
  {
    analyteName: String,
    characteristics: [
      {
        name: String,
        description: String,
        value: String,
      },
    ],
  },
  { _id: false }
);

export const Analytes = mongoose.model(
  'AnalyteSchema',
  analyteSchema,
  'hwa-analytes'
);
