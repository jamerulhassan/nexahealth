export const HospitalValidation = {
  hospitalId: {
    notEmpty: {
      errorMessage: "Hospital ID must not be empty",
    },
    isString: {
      errorMessage: "Hospital ID must be a string",
    },
  },

  hospitalName: {
    notEmpty: {
      errorMessage: "Hospital name must not be empty",
    },
    isString: {
      errorMessage: "Hospital name must be a string",
    },
  },

  location: {
    notEmpty: {
      errorMessage: "Location must not be empty",
    },
    isString: {
      errorMessage: "Location must be a string",
    },
  },

  latitude: {
    notEmpty: {
      errorMessage: "Latitude must not be empty",
    },
    isFloat: {
      options: { min: -90, max: 90 },
      errorMessage: "Latitude must be between -90 and 90",
    },
  },

  longitude: {
    notEmpty: {
      errorMessage: "Longitude must not be empty",
    },
    isFloat: {
      options: { min: -180, max: 180 },
      errorMessage: "Longitude must be between -180 and 180",
    },
  },

  "bloodCapacity.A_Positive": {
    notEmpty: {
      errorMessage: "A+ blood count is required",
    },
    isInt: {
      options: { min: 0 },
      errorMessage: "A+ blood count must be a number",
    },
  },

  "bloodCapacity.B_Positive": {
    notEmpty: { errorMessage: "B+ blood count is required" },
    isInt: {
      options: { min: 0 },
      errorMessage: "B+ blood count must be a number",
    },
  },

  "bloodCapacity.O_Positive": {
    notEmpty: { errorMessage: "O+ blood count is required" },
    isInt: {
      options: { min: 0 },
      errorMessage: "O+ blood count must be a number",
    },
  },

  "bloodCapacity.AB_Positive": {
    notEmpty: { errorMessage: "AB+ blood count is required" },
    isInt: {
      options: { min: 0 },
      errorMessage: "AB+ blood count must be a number",
    },
  },

  "bloodCapacity.A_Negative": {
    notEmpty: { errorMessage: "A- blood count is required" },
    isInt: {
      options: { min: 0 },
      errorMessage: "A- blood count must be a number",
    },
  },

  "bloodCapacity.B_Negative": {
    notEmpty: { errorMessage: "B- blood count is required" },
    isInt: {
      options: { min: 0 },
      errorMessage: "B- blood count must be a number",
    },
  },

  "bloodCapacity.O_Negative": {
    notEmpty: { errorMessage: "O- blood count is required" },
    isInt: {
      options: { min: 0 },
      errorMessage: "O- blood count must be a number",
    },
  },

  "bloodCapacity.AB_Negative": {
    notEmpty: { errorMessage: "AB- blood count is required" },
    isInt: {
      options: { min: 0 },
      errorMessage: "AB- blood count must be a number",
    },
  },

  doctors: {
    isArray: {
      errorMessage: "Doctors must be an array",
    },
    notEmpty: {
      errorMessage: "At least one doctor is required",
    },
  },

  "doctors.*.doctorName": {
    notEmpty: {
      errorMessage: "Doctor name must not be empty",
    },
    isString: {
      errorMessage: "Doctor name must be a string",
    },
  },

  "doctors.*.specialty": {
    notEmpty: {
      errorMessage: "Doctor specialty must not be empty",
    },
    isString: {
      errorMessage: "Doctor specialty must be a string",
    },
  },

  specializations: {
    isArray: {
      errorMessage: "Specializations must be an array",
    },
    notEmpty: {
      errorMessage: "At least one specialization is required",
    },
  },

  "specializations.*": {
    isString: {
      errorMessage: "Each specialization must be a string",
    },
  },
};
