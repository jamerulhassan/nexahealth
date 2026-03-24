import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import "./config/passport.js";
import mainRoute from './routes/mainRoute.js'
import { Hospital } from "./models/hospitalSchema.js";
import { Ambulance } from "./models/ambulanceModelSchema.js";
const app = express();
app.set("trust proxy", 1);
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/nexahealth')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


app.use(session({
  name: "connect.sid",
  secret: 'asdfghjkl;',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: false,
    sameSite: "lax"       
  }
}));


app.use(passport.initialize());
app.use(passport.session());


// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "../client/build")));
// app.get("/", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "../client/build/index.html")
//   );
// });
/* 
s%3ATryZqCHM0xCR8FcR3WGnAeB4M1FPKPLV.j3mO5rIwXcuWsf9sjXHOs2n7SINsbgyMb%2BQ4zFDp8MU */
// Node / Express
app.patch("/api/hospitals/:hospitalId", async (req, res) => {
  try {
    const { hospitalId } = req.params;
    const updates = req.body;
    console.log("udated data are below");
    
    console.log(updates);
     // partial updates allowed
    const updatedHospital = await Hospital.findOneAndUpdate(
      { hospitalId },
      { $set: updates },
      { new: true }
    );

    if (!updatedHospital) return res.status(404).json({ status: "fail", message: "Hospital not found" });

    res.json({ status: "success", data: updatedHospital });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});


app.post("/auth/me", (req, res)=>{ 
  if(req.user){
    return res.send(true)
  }
  res.send(false)
})
app.get("/nexahealth/hospitals", async(req, res)=>{
  try {
    const hospitals = await Hospital.find();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})
app.post("/ambulance", async(req, res)=>{
  console.log("ambulance");
  
  const {userLoc} = req.body
  
  let nearestHospital
  try{
     nearestHospital =await Ambulance.findOne({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [userLoc.lon, userLoc.lat]
          }
        }
      }
    });
    res.json({phoneNumber : nearestHospital.phoneNumber})   
  }catch(err){
    console.log(err);
    
  }
})
app.use(mainRoute)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
