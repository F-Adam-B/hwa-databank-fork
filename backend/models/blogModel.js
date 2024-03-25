import mongoose from 'mongoose';

const { Schema } = mongoose;

const blogPostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets to current date/time on creation
  },
});

export const BlogPost = mongoose.model('BlogPost', blogPostSchema);
