import  mongoose  from "mongoose";


const ambulanceModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  phoneNumber: {
    type: String,      // string is better (country code + leading zeros)
    required: true
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  }
});

export const Ambulance = mongoose.model(
  "Ambulance",
  ambulanceModelSchema
);
