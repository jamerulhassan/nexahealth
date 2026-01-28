const hospitals = [
  {
    hospitalId: "CBEH001",
    hospitalName: "Coimbatore Medical College Hospital",
    location: "Avinashi Road, Coimbatore",
    latitude: 11.0168,
    longitude: 76.9558,

    bloodCapacity: {
      A_Positive: 120,
      B_Positive: 80,
      O_Positive: 150,
      AB_Positive: 40,
      A_Negative: 30,
      B_Negative: 20,
      O_Negative: 25,
      AB_Negative: 10
    },

    doctors: [
      {
        doctorName: "Dr. Ravi Kumar",
        specialty: "Emergency Medicine"
      },
      {
        doctorName: "Dr. Meena Lakshmi",
        specialty: "Cardiology"
      }
    ],

    specializations: ["Emergency Medicine", "Cardiology", "General Medicine"]
  },

  {
    hospitalId: "CBEH002",
    hospitalName: "KG Hospital",
    location: "Arts College Road, Coimbatore",
    latitude: 11.0056,
    longitude: 76.9616,

    bloodCapacity: {
      A_Positive: 90,
      B_Positive: 60,
      O_Positive: 110,
      AB_Positive: 25,
      A_Negative: 20,
      B_Negative: 15,
      O_Negative: 20,
      AB_Negative: 5
    },

    doctors: [
      {
        doctorName: "Dr. Suresh Babu",
        specialty: "Orthopedics"
      },
      {
        doctorName: "Dr. Anitha Raj",
        specialty: "Neurology"
      }
    ],

    specializations: ["Orthopedics", "Neurology", "Physiotherapy"]
  },

  {
    hospitalId: "CBEH003",
    hospitalName: "PSG Hospitals",
    location: "Peelamedu, Coimbatore",
    latitude: 11.0283,
    longitude: 77.0271,

    bloodCapacity: {
      A_Positive: 100,
      B_Positive: 70,
      O_Positive: 130,
      AB_Positive: 35,
      A_Negative: 25,
      B_Negative: 20,
      O_Negative: 30,
      AB_Negative: 8
    },

    doctors: [
      {
        doctorName: "Dr. Arun Prakash",
        specialty: "General Surgery"
      },
      {
        doctorName: "Dr. Divya R",
        specialty: "Pediatrics"
      }
    ],

    specializations: ["Surgery", "Pediatrics", "Emergency Medicine"]
  }
];

export default hospitals;
