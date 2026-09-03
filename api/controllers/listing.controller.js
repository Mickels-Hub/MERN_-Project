import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';
import Notification from '../models/notification.model.js';

// Create a new listing (Admin only)
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);

    // Broadcast notification to all users when a new listing is posted
    const users = await User.find({});
    const notificationsData = users.map((user) => ({
      userId: user._id,
      message: `New property posted: "${listing.name}"`,
      isRead: false,
    }));

    await Notification.insertMany(notificationsData);

    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};


// Delete a listing
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

// Update a listing
export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

// Get a single listing by ID (Protected by Admin/Paywall Check)
// Get a single listing by ID (Protected by Admin/Paywall Check)
// Get a single listing by ID (Protected by Admin/Paywall Check)
// Get a single listing by ID (Protected by Admin/Paywall Check)
export const getlisting = async (req, res, next) => {
  try {
    // Check both req.params.id and req.params.listingId to prevent backend crashes
    const listingId = req.params.id || req.params.listingId;

    if (!listingId) {
      return next(errorHandler(400, 'Listing ID is required!'));
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }

    // Safely extract user info
    const currentUser = req.user || {};
    const adminEmail = 'ugochukwumickel15@gmail.com';
    const isAdmin = currentUser.email === adminEmail || currentUser.isAdmin === true;

    let isUserPaid = currentUser.isPaid === true || currentUser.hasPaid === true;

    // Safely check user payment status in DB if user is logged in
    if (!isUserPaid && currentUser.id) {
      try {
        const user = await User.findById(currentUser.id);
        if (user && (user.isPaid || user.hasPaid)) {
          isUserPaid = true;
        }
      } catch (err) {
        // Prevent DB lookup errors from triggering a 500 response
      }
    }

    // Access check
    if (!isAdmin && !isUserPaid) {
      return next(errorHandler(403, 'Access denied! Complete payment to view this listing.'));
    }

    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
export const getListings = async (req, res, next) => {
  try {
    // 1. Check if user is logged in via token (req.user is populated by verifyToken middleware if used, or check custom headers/session)
    // If you use verifyToken middleware on the /get route, req.user will exist.
    const currentUser = req.user || {}; 
    
    // Define your admin email safely and check token properties
  const adminEmail = 'ugochukwumickel15@gmail.com';
  const userEmail = currentUser?.email || '';
  const isAdmin = userEmail === adminEmail || currentUser?.isAdmin === true;
  const isPaidUser = currentUser?.isPaid === true || currentUser?.hasPaid === true;
  // Temporarily bypassed to let your page and listings load freely
// if (!isAdmin && !isPaidUser) {
//   return next(errorHandler(403, 'Please sign in and complete payment to access and browse listings!'));
// }


    // 3. Normal listing fetch logic for authorized users / admin
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const query = {
      offer,
      furnished,
      parking,
      type,
    };

    if (searchTerm && searchTerm.trim() !== '') {
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { address: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    const listings = await Listing.find(query)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

// Toggle Like / Unlike
// Toggle Like
export const likeListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.listingId);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    const userId = req.user.id;
    const hasLiked = listing.likes.includes(userId);
    const hasDisliked = listing.dislikes.includes(userId);

    if (hasLiked) {
      listing.likes = listing.likes.filter((id) => id !== userId);
    } else {
      listing.likes.push(userId);
      if (hasDisliked) {
        listing.dislikes = listing.dislikes.filter((id) => id !== userId);
      }
    }

    await listing.save();
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// Toggle Dislike
export const dislikeListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.listingId);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    const userId = req.user.id;
    const hasDisliked = listing.dislikes.includes(userId);
    const hasLiked = listing.likes.includes(userId);

    if (hasDisliked) {
      listing.dislikes = listing.dislikes.filter((id) => id !== userId);
    } else {
      listing.dislikes.push(userId);
      if (hasLiked) {
        listing.likes = listing.likes.filter((id) => id !== userId);
      }
    }

    await listing.save();
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// Add Comment
export const addComment = async (req, res, next) => {
  try {
    const { comment } = req.body;
    const listing = await Listing.findById(req.params.listingId);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    // Fetch user from DB to guarantee we have their correct username
    const user = await User.findById(req.user.id);
    const username = user ? user.username : 'User';

    const newComment = {
      userRef: req.user.id,
      username: username,
      comment,
    };

    listing.comments.push(newComment);
    await listing.save();
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
export const addReplyToComment = async (req, res, next) => {
  try {
    const { replyText } = req.body;
    const { listingId, commentId } = req.params;

    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    const comment = listing.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    const user = await User.findById(req.user.id);
    const username = user ? user.username : 'User';

    const newReply = {
      userRef: req.user.id,
      username: username,
      reply: replyText,
    };

    comment.replies.push(newReply);
    await listing.save();
    res.status(200).json(listing);
  } catch (error) {
    console.log("REPLY ERROR:", error);
    next(error);
  }
};

export const getAdminListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({}).sort({ createdAt: -1 });
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};