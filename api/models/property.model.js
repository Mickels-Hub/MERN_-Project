import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: String, required: true }, // e.g., Lekki, Ikeja, Victoria Island
    regularPrice: { type: Number, required: true },
    propertyType: { type: String, required: true }, // e.g., Apartment, Duplex, Land
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    furnished: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    imageUrls: { type: Array, required: true },
    landlord: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      whatsapp: { type: String, required: true },
      email: { type: String },
    },
    status: { type: String, default: 'published' }, // published, rented, draft
  },
  { timestamps: true }
);

const Property = mongoose.model('Property', propertySchema);
export default Property;