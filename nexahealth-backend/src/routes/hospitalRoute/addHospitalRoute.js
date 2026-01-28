import { Router } from "express";
import { HospitalValidation } from "../../validators/HospitalValidation.js";
import { checkSchema } from "express-validator";
import addHospital from "../../controller/hospital.controller.js/addHospital.js";


const router = Router();

router.post("/api/hospitals", checkSchema(HospitalValidation), addHospital);

export default router;