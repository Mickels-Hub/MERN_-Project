import Community from '../models/community.model.js';
import { errorHandler } from '../utils/error.js';

export const getCommunityPosts = async (req, res, next) => {
  try {
    const posts = await Community.find({}).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const createCommunityPost = async (req, res, next) => {
  try {
    const newPost = new Community({
      ...req.body,
      userRef: req.user.id,
      username: req.user.username || 'Member',
      avatar: req.user.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

// Add reply to a post (WhatsApp/Facebook style thread)
export const addReplyToPost = async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) return next(errorHandler(400, 'Reply cannot be empty!'));

    const reply = {
      userRef: req.user.id,
      username: req.user.username || 'Member',
      avatar: req.user.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      content,
      createdAt: new Date(),
    };

    const updatedPost = await Community.findByIdAndUpdate(
      req.params.id,
      { $push: { replies: reply } },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const deleteCommunityPost = async (req, res, next) => {
  try {
    const post = await Community.findById(req.params.id);
    if (!post) return next(errorHandler(404, 'Post not found!'));

    if (req.user.id !== post.userRef && req.user.email !== 'ugochukwumickel15@gmail.com' && req.user.role !== 'moderator') {
      return next(errorHandler(401, 'Unauthorized to delete this post!'));
    }

    await Community.findByIdAndDelete(req.params.id);
    res.status(200).json('Post deleted successfully.');
  } catch (error) {
    next(error);
  }
};