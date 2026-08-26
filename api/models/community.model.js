import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema(
  {
    userRef: { type: String, required: true },
    username: { type: String, required: true },
    avatar: { type: String, required: true },
    content: { type: String, required: true },
    replies: [
      {
        userRef: String,
        username: String,
        avatar: String,
        content: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Community = mongoose.model('Community', communitySchema);
export default Community;