import { validationResult, matchedData } from "express-validator";
import { generateHash } from "../../utils/passwordHash.js";
import { HospitalUser } from "../../models/hospitalUserModelSchema.js";
import { GovtUser } from "../../models/govtUserModelSchema.js";
import { Hospital } from "../../models/hospitalSchema.js";

const addHospital = async (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    console.log(result.array());
    
    return res.send({
      error: result.array()
    });
  }
  try {
    const newHospital = new Hospital(matchedData(req));
    const savedHospital = await newHospital.save();
    res.send({ status: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Internal Server Error"
    });
  }
};

export default addHospital;
