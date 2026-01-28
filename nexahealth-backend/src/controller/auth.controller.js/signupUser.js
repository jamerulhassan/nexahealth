import { validationResult, matchedData } from "express-validator";
import { generateHash } from "../../utils/passwordHash.js";
import { HospitalUser } from "../../models/hospitalUserModelSchema.js";
import { GovtUser } from "../../models/govtUserModelSchema.js";

const signupUser = async (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    console.log(result.array());
    
    return res.send({
      error: result.array()
    });
  }
console.log(req.body);

  try {
    let newUser;
    if(req.body.role === 'hospital'){
        newUser = new HospitalUser(matchedData(req));
    }else{
         newUser = new GovtUser(matchedData(req));
    }
   

    newUser.password = generateHash(newUser.password);

    const savedUser = await newUser.save();

    req.login(savedUser, (err) => {
      if (err) return next(err);
      res.send({ status: "success" });
    });

  } catch (err) {
    console.log(err);
    
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      console.log(field);
      
      return res.send({
        status: `${field} is already register`
      });
    }

    console.error(err);
    res.status(500).send({
      error: "Internal Server Error"
    });
  }
};

export default signupUser;
