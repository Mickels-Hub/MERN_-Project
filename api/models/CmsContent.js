import mongoose from 'mongoose';

const cmsSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      unique: true, // e.g. "hero", "promotion", "about"
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

const CmsContent = mongoose.model('CmsContent', cmsSchema);
export default CmsContent;