import { Router } from 'express';
import mongoose from 'mongoose';
import { WaterSample } from '../models/waterSampleModel.js';
const router = Router();

// import model and use where needed.

// need error handling middleware
router.get('/', async (req, res) => {
  try {
    const samples = await WaterSample.find({}).limit(50);
    res.json({
      samples,
    });
  } catch (error) {
    console.log('Error retrieving samples: ', error);
  }
});

// router.use(errorHandler);

export { router };
