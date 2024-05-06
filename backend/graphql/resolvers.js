import { startSession } from 'mongoose';
import { Analytes } from '../models/analyteModel.js';
import { NewsFeed } from '../models/newsFeedModel.js';
import { User } from '../models/userModel.js';
import { WaterSample } from '../models/waterSampleModel.js';
import { storeUpload, updateNewsFeedResponse } from '../utils/index.js';

import { unlink } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resolvers = {
  Query: {
    formFieldValues: async () => {
      try {
        const result = await WaterSample.aggregate([
          {
            $group: {
              _id: null, // Group by null to aggregate over the whole collection
              uniqueStationNames: { $addToSet: '$stationName' },
              uniqueOrganizations: { $addToSet: '$project.organization' },
              uniqueMatrices: { $addToSet: '$matrix' },
              uniqueWaterBodies: { $addToSet: '$waterBody' },
              // Add other fields here as needed
            },
          },
          {
            $project: {
              _id: 0, // Exclude the _id field from results
              uniqueStationNames: 1,
              uniqueOrganizations: 1,
              uniqueMatrices: 1,
              uniqueWaterBodies: 1,
              // Include other fields here as needed
            },
          },
        ]);

        if (result.length > 0) {
          return result[0];
        } else {
          console.log('No unique values found.');
          return {}; // Optionally return an empty object or any other appropriate value
        }
      } catch (error) {
        console.error('Error fetching distinct values:', error);
        throw new Error('Error fetching distinct values'); // Propagate the error up to GraphQL
      }
    },
    newsFeedPosts: async () => {
      try {
        const response = await NewsFeed.find().sort({ createdAt: -1 });
        const updatedResponse = updateNewsFeedResponse(
          response,
          process.env.BASE_URL
        );
        return updatedResponse;
      } catch (error) {
        console.error('Error retrieving news feed posts: ', error);
        throw new Error(error);
      }
    },
    samples: async () => {
      const response = await WaterSample.find({
        'location.coordinates': { $ne: [null, null] },
      });
      return response;
    },
    sample: async (_parent, args) => {
      const {
        analytes = [],
        matrix,
        stationName,
        organization,
        fromDate,
        toDate,
        waterBody,
      } = args;
      try {
        // Create a filter object based on provided arguments
        const queryFilter = {
          'location.coordinates': { $exists: true, $ne: null },
        };
        if (matrix) queryFilter.matrix = matrix;
        if (stationName) queryFilter.stationName = stationName;
        if (organization) queryFilter['project.organization'] = organization;
        if (analytes.length > 0)
          queryFilter['analytesTested.analyteName'] = { $in: analytes };
        if (fromDate && toDate) {
          queryFilter.sampleDate = { $gte: fromDate, $lte: toDate };
        } else if (fromDate) {
          queryFilter.sampleDate = { $gte: fromDate };
        } else if (toDate) {
          queryFilter.sampleDate = { $lte: toDate };
        }
        if (waterBody) queryFilter.waterBody = waterBody;
        const response = await WaterSample.find(queryFilter);
        return response;
      } catch (error) {
        console.log('Error finding sample: ', error);
        throw new Error(error);
      }
    },
    analytes: async () => {
      try {
        const response = await Analytes.find();
        return response;
      } catch (error) {
        console.log('Error finding analytes: ', error);
        throw new Error(error);
      }
    },
    analytesCharacteristics: async (_parent, args) => {
      const { listOfAnalyteNames } = args;
      const analyteCharQueryFilter = { analyteName: listOfAnalyteNames };

      try {
        const response = await Analytes.find(analyteCharQueryFilter);
        return response;
      } catch (error) {
        console.log('Error finding analyte characteristics ', error);
      }
    },
    users: async () => {
      try {
        const response = await User.find();
        return response;
      } catch (error) {
        console.log('Error finding users: ', error);
        throw new Error(error);
      }
    },
  },
  Mutation: {
    addNewsFeedMutation: async (_parent, { newsFeedValues }) => {
      const { authorId, content, imageFile } = newsFeedValues;
      const session = await startSession();
      let outFile;
      try {
        session.startTransaction();
        const authorExists = await User.findById(authorId).session(session);
        if (!authorExists?.isAdmin) {
          throw new Error('User does not exist or is not authorized to post');
        }

        if (imageFile) {
          const {
            file: { createReadStream, filename },
          } = await imageFile;
          // Store the file in the filesystem.
          outFile = await storeUpload({ createReadStream, filename });
        }

        const newNewsFeed = new NewsFeed({
          authorId: authorExists.id,
          content,
          imageUrl: outFile,
        });

        const response = await newNewsFeed.save({ session });
        await session.commitTransaction();
        return response;
      } catch (error) {
        console.error(`Error adding news feed post: ${error.message}`);
        await session.abortTransaction();
        throw new Error('Failed to save news feed post');
      } finally {
        session.endSession();
      }
    },
    addSampleMutation: async (_parent, args) => {
      try {
        const newSample = new WaterSample(args.sampleFormValues);
        const response = await newSample.save();
        return response;
      } catch (error) {
        console.error('Error adding sample to database', error);
        return new Error(error);
      }
    },
    addUserMutation: async (_parent, args) => {
      try {
        const newUser = new User({
          ...args.userFormValues,
          isAdmin: true,
        });
        const response = await newUser.save();
        return response;
      } catch (error) {
        console.error('Error adding user to database', error);
        return new Error(error);
      }
    },
    deleteNewsFeedMutation: async (_parent, args) => {
      const { id } = args;

      try {
        const newsFeedToBeDeleted = await NewsFeed.findById(id);
        if (!newsFeedToBeDeleted) {
          throw new Error('Post not found');
        }
        if (newsFeedToBeDeleted.imageUrl) {
          const imagePath = path.join(
            __dirname,
            '..',
            newsFeedToBeDeleted.imageUrl
          );

          await unlink(imagePath);
        }

        const newsFeedDeletedResponse = await NewsFeed.findByIdAndDelete(id);

        return newsFeedDeletedResponse;
      } catch (error) {
        console.error('Error deleting news feed post: ', error);
        throw new Error(error);
      }
    },
  },
};
export default resolvers;