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

    const type = req.query.type;
    const category = req.query.category || req.query.propertyType;
    const searchTerm = req.query.searchTerm || '';

    const query = {};

    // 1. Transaction Type (Rent vs Sale)
    if (type && type !== 'all') {
      query.$or = [{ propertyType: type }, { type: type }];
    }

    // 2. Strict Category Matching (Fixes "Island" and "Landlord" matching Land!)
    if (category && category !== 'all') {
      if (category === 'land') {
        query.$and = [
          {
            $or: [
              { propertyType: 'land' },
              { title: /\bland\b|\bplot\b|\bacre\b|\bhectare\b/i },
            ],
          },
          // Exclude listings with bedrooms/bathrooms or words like "apartment", "house", "flat"
          { title: { $not: /\bapartment\b|\bflat\b|\broom\b|\bduplex\b|\bhouse\b/i } },
        ];
      } else if (category === 'apartment') {
        query.$or = [
          { propertyType: 'apartment' },
          { title: /\bapartment\b|\bflat\b/i },
          { description: /\bapartment\b|\bflat\b/i },
        ];
      } else if (category === 'duplex') {
        query.$or = [
          { propertyType: 'duplex' },
          { title: /\bduplex\b|\bmansion\b|\bterrace\b|\bvilla\b/i },
          { description: /\bduplex\b|\bmansion\b/i },
        ];
      } else if (category === 'studio') {
        query.$or = [
          { propertyType: 'studio' },
          { title: /\bstudio\b|\bself contain\b|\b1 room\b|\bone room\b/i },
          { description: /\bstudio\b|\bself contain\b/i },
        ];
      } else if (category === 'shortlet') {
        query.$or = [
          { propertyType: 'shortlet' },
          { title: /\bshortlet\b|\bserviced\b|\bshort stay\b/i },
          { description: /\bshortlet\b|\bserviced\b/i },
        ];
      } else if (category === 'commercial') {
        query.$or = [
          { propertyType: 'commercial' },
          { title: /\bcommercial\b|\boffice\b|\bshop\b|\bwarehouse\b/i },
          { description: /\bcommercial\b|\boffice\b/i },
        ];
      }
    }

    // 3. Keyword / Location Search
    if (searchTerm.trim() !== '') {
      const searchRegex = new RegExp(searchTerm.trim(), 'i');
      query.$and = [
        {
          $or: [
            { title: searchRegex },
            { address: searchRegex },
            { location: searchRegex },
            { description: searchRegex },
          ],
        },
      ];
    }

    const listings = await Property.find(query)
      .sort({ [sortField]: sortOrder })
      .limit(limit)
      .skip(startIndex)
      .lean();

    return res.status(200).json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return res.status(200).json([]);
  }
};

export const getListings = getlistings;