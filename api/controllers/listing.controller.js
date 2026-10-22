import Property from '../models/property.model.js';
import ContactUnlock from '../models/contactUnlock.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Property.create(req.body);
    return res.status(201).json({ success: true, listing });
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Property.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Property listing not found!'));
    }

    let unlockRecord = null;
    if (req.user && req.user.id) {
      unlockRecord = await ContactUnlock.findOne({
        userId: req.user.id,
        propertyId: req.params.id,
        status: 'success',
      });
    }

    if (!unlockRecord && (!req.user || !req.user.isAdmin)) {
      const listingObject = listing.toObject();
      if (listingObject.landlord) {
        listingObject.landlord = {
          name: 'Locked Contact',
          phone: '**********',
          whatsapp: '**********',
          email: 'locked@miestate.com',
        };
      }
      return res.status(200).json({ success: true, listing: listingObject, unlocked: false });
    }

    return res.status(200).json({ success: true, listing, unlocked: true });
  } catch (error) {
    next(error);
  }
};

export const getListingById = getListing;

export const getlistings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 200;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const rawSort = req.query.sort || 'createdAt';
    const sortField = rawSort === 'regularPrice' ? 'regularPrice' : 'createdAt';
    const sortOrder = req.query.order === 'asc' ? 1 : -1;

    const searchTerm = req.query.searchTerm || '';

    const conditions = [];

    // ONLY filter by searchTerm (location/keywords) in the backend. 
    // This guarantees Epe/Ikeja searches work without breaking on missing 'type' DB fields!
    if (searchTerm.trim() !== '') {
      const searchRegex = new RegExp(searchTerm.trim(), 'i');
      conditions.push({
        $or: [
          { title: searchRegex },
          { address: searchRegex },
          { location: searchRegex },
          { description: searchRegex },
        ],
      });
    }

    const query = conditions.length > 0 ? { $and: conditions } : {};

    const Property = (await import('../models/property.model.js')).default;

    const listings = await Property.find(query)
      .sort({ [sortField]: sortOrder })
      .limit(limit)
      .skip(startIndex)
      .lean();

    return res.status(200).json(listings);
  } catch (error) {
    console.error('[Backend API Error]:', error);
    return res.status(200).json([]);
  }
};

export const getListings = getlistings;
// YOUR EXISTING LOCATION STATS CONTROLLER
export const getLocationStats = async (req, res, next) => {
  try {
    const Property = (await import('../models/property.model.js')).default;
    const sectors = ['Lekki', 'Victoria Island', 'Ikoyi', 'Ikeja', 'Yaba', 'Epe', 'Surulere', 'Ajah'];
    const stats = {};

    for (const sector of sectors) {
      const regex = new RegExp(sector, 'i');
      const count = await Property.countDocuments({
        $or: [
          { address: regex },
          { location: regex },
          { title: regex },
          { description: regex }
        ]
      });
      stats[sector.toLowerCase()] = count;
    }

    return res.status(200).json({ success: true, stats });
  } catch (error) {
    next(error);
  }
};