import Property from '../models/property.model.js';
import ContactUnlock from '../models/contactUnlock.model.js';
import { errorHandler } from '../utils/error.js';

// Get all listings with filters, search, and pagination
export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let propertyType = req.query.propertyType;
    if (propertyType === undefined || propertyType === 'all') {
      propertyType = { $in: ['Apartment', 'Duplex', 'Land', 'House'] };
    } else {
      propertyType = req.query.propertyType;
    }

    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      title: { $regex: searchTerm, $options: 'i' },
      furnished,
      parking,
      propertyType,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

// Get a single listing by ID and enforce the ₦45,000 unlock check for landlord contacts
export const getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Property listing not found!'));
    }

    // Check if the requesting user has unlocked this property's contact
    const unlockRecord = await ContactUnlock.findOne({
      userId: req.user.id,
      propertyId: req.params.id,
      status: 'success'
    });

    // If the user hasn't paid, we hide the sensitive landlord details for security
    if (!unlockRecord && !req.user.isAdmin) {
      const listingObject = listing.toObject();
      if (listingObject.landlord) {
        listingObject.landlord = {
          name: 'Locked (Pay ₦45,000 to Unlock)',
          phone: '**********',
          whatsapp: '**********',
          email: 'locked@lagosestate.com'
        };
      }
      return res.status(200).json({ success: true, listing: listingObject, unlocked: false });
    }

    // If they paid or are admin, give them full details
    return res.status(200).json({ success: true, listing, unlocked: true });
  } catch (error) {
    next(error);
  }
};