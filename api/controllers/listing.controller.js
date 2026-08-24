import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    // Check if the user trying to create a listing is the admin
    // (You can replace this email with your actual admin Gmail address)
    if (req.user.email !== 'ugochukwumickel15@gmail.com') {
      return next(errorHandler(403, 'You are not authorized to create listings!'));
    }

    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};