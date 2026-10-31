import Report from '../models/report.model.js';

export const createReport = async (req, res, next) => {
  try {
    const { listingId, reason, description } = req.body;
    const userId = req.user.id;

    // Map listingId -> propertyId and description -> details to match your model
    const newReport = await Report.create({
      userId,
      propertyId: listingId,
      reason,
      details: description,
    });

    return res.status(201).json({ 
      success: true, 
      message: 'Report submitted successfully to admin.' 
    });
  } catch (error) {
    console.error('Report Creation Error:', error);
    next(error);
  }
};