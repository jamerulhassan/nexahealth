import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { HospitalUser } from "../models/hospitalUserModelSchema.js";
import { verifyPassword } from "../utils/passwordHash.js";
import { GovtUser } from "../models/govtUserModelSchema.js";
import {Hospital} from '../models/hospitalSchema.js'

passport.serializeUser((user, done)=>{    
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  console.log("in deserializer");

  try {
    const hospitalUser = await HospitalUser.findById(id).lean();
    if (hospitalUser) {
      return done(null, { ...hospitalUser, role: "hospital" });
    }

    const govtUser = await GovtUser.findById(id).lean();
    if (govtUser) {
      return done(null, { ...govtUser, role: "govt" });
    }

    // user not found in both collections
    done(null, false);
  } catch (err) {
    done(err, false);
  }
});


passport.use(
  new LocalStrategy(
    { usernameField: "id", passwordField: "password", passReqToCallback: true },
    async (req, id, password, done) => {
      try {
        console.log(req.body);
        
        const { role } = req.body;
        let user;
        let hospitalInfo;
        if (role === "hospital") {
          user = await HospitalUser.findOne({ hospitalId: id });
          if(user) {
            hospitalInfo = await Hospital.findOne({hospitalId : id})
          }
        } 
        else if (role === "govt") {
          user = await GovtUser.findOne({ govtId: id });
        } 
        else {
          return done(null, false, "Invalid role");
        }

        if (!user) {
            console.log("usernotfound");
            
          return done(null, false, "userNotFound");
        }

        if (!verifyPassword(password, user.password)) {
          return done(null, false,"password Incorrect");
        }
        const resultUser = { ...user.toObject(), hospitalInfo };
        return done(null, resultUser);

      } catch (err) {
        return done(err);
      }
    }
  )
);
