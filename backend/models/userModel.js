import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures usernames are unique in the collection
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false, // By default, users are not administrators
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to current time on account creation
  },
});

export const User = mongoose.model('User', userSchema);
