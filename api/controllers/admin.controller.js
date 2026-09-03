import User from '../models/user.model.js';
import Listing from '../models/listing.model.js';
import Community from '../models/community.model.js'; // import your community model

export const getAdminStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalListings = await Listing.countDocuments();
    const communityPosts = await Community.countDocuments(); // counts actual posts/documents
    
    // If you have a role filter for sub-admins:
    const activeSubAdmins = await User.countDocuments({ role: { $regex: 'subadmin', $options: 'i' } });

    res.status(200).json({
      totalUsers,
      totalListings,
      communityMembers: totalUsers, // or a separate member query if applicable
      communityPosts,
      activeSubAdmins,
    });
  } catch (error) {
    next(error);
  }
};