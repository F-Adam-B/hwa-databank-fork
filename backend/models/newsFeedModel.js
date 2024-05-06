import mongoose from 'mongoose';

const { Schema } = mongoose;

const NewsFeedSchema = new Schema({
  content: {
    type: String,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets to current date/time on creation
  },
});

export const NewsFeed = mongoose.model('NewsFeed', NewsFeedSchema);