import fs from 'fs';
import { Router } from 'express';
import mongoose from 'mongoose';
import { WaterSample } from '../models/waterSampleModel.js';
const router = Router();

import samples from './dummyData.json' assert { type: 'json' };

// need error handling middleware
router.get('/', async (req, res) => {
  const filterSamplesWithoutCoors = {
    'location.coordinates': { $ne: [null, null] },
  };
  try {
    // const samples = await WaterSample.find(filterSamplesWithoutCoors);

    res.json({
      ...samples,
    });
  } catch (error) {
    console.log('Error retrieving samples: ', error);
  }
});

// router.use(errorHandler);

export { router };
