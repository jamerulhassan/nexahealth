import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: String,
      required: true,
      unique: true,
    },
    hospitalPhoneno: {          // <-- ADD THIS
      type: String,
      required: true,
      trim: true,
    },
    hospitalName: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    bloodCapacity: {
      A_Positive: { type: Number, required: true },
      B_Positive: { type: Number, required: true },
      O_Positive: { type: Number, required: true },
      AB_Positive: { type: Number, required: true },
      A_Negative: { type: Number, required: true },
      B_Negative: { type: Number, required: true },
      O_Negative: { type: Number, required: true },
      AB_Negative: { type: Number, required: true },
    },

    doctors: [
      {
        doctorName: {
          type: String,
          required: true,
          trim: true,
        },
        specialty: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],

    specializations: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Hospital =  mongoose.model("Hospital", hospitalSchema);
