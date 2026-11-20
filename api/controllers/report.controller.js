import Report from '../models/report.model.js';
import User from '../models/user.model.js';

// Create a new report (User)
export const createReport = async (req, res, next) => {
  try {
    const { reason, category, subject, description, message, listingId } = req.body;
    const newReport = await Report.create({
      userId: req.user.id,
      reason: reason || category || subject || 'General Report',
      description: description || message || '',
      listingId,
    });
    res.status(201).json({ success: true, message: 'Report submitted successfully', newReport });
  } catch (error) {
    next(error);
  }
};

// Get all reports (Admin) - Manually resolves user details regardless of field key
export const getAllReportsAdmin = async (req, res, next) => {
  try {
    const rawReports = await Report.find().sort({ createdAt: -1 }).lean();

    const populatedReports = await Promise.all(
      rawReports.map(async (report) => {
        // Check every possible field where the user ID might have been stored
        const possibleUserId =
          report.userId?._id ||
          report.userId ||
          report.user?._id ||
          report.user ||
          report.reporter ||
          report.createdBy;

        let userInfo = null;
        if (possibleUserId) {
          userInfo = await User.findById(possibleUserId).select('username email avatar').lean();
        }

        return {
          ...report,
          resolvedUser: userInfo || {
            username: report.username || report.name || 'Unknown User',
            email: report.email || report.userEmail || 'No email recorded',
          },
          resolvedReason: report.reason || report.category || report.subject || report.type || 'General Inquiry',
          resolvedMessage: report.description || report.message || report.details || report.comment || 'No additional message provided.',
        };
      })
    );

    res.status(200).json({ success: true, reports: populatedReports });
  } catch (error) {
    next(error);
  }
};

// Update report status (Admin)
export const updateReportStatusAdmin = async (req, res, next) => {
  try {
    const { reportId } = req.params;
    const { status } = req.body;

    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      { status },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'Report status updated successfully', updatedReport });
  } catch (error) {
    next(error);
  }
};