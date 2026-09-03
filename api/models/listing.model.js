import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true, // e.g., 'rent' or 'sale'
    },
    offer: {
      type: Boolean,
      required: true,
    },
      landlordName: {
    type: String,
    required: true,
  },
  landlordPhone: {
    type: String,
    required: true,
  },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  // Inside your listing schema:
likes: {
  type: Array,
  default: [],
},
dislikes: {
  type: Array,
  default: [],
},
comments: [
  {
    userRef: { type: String, required: true },
    username: { type: String, required: true },
    comment: { type: String, required: true },
    image: { type: String }, // For attaching images
    likes: { type: Array, default: [] },
    replies: [
      {
        userRef: { type: String, required: true },
        username: { type: String, required: true },
        reply: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      }
    ],
    createdAt: { type: Date, default: Date.now },
  }
]
},
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;