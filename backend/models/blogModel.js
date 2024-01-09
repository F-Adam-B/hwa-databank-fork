import mongoose, { Schema } from 'mongoose';

// User Schema - assuming you have a user collection too
// const userSchema = new Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true }
// });
// const User = mongoose.model('User', userSchema);

// Post Schema
const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // referencing 'User' collection
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // referencing 'Comment' collection
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Comment Schema - assuming you have a comment collection too
const commentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  createdAt: { type: Date, default: Date.now }
});
const Comment = mongoose.model('Comment', commentSchema);

// Create the Post Model from the Schema
const Post = mongoose.model('Post', postSchema);

 export {
//   User,
  Post,
  Comment
};



