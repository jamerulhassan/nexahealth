import { Router } from "express";
import { checkSchema} from "express-validator";
import signupUser from "../../controller/auth.controller.js/signupUser.js";
import { HospitalUserValidation } from "../../validators/HospitalUserValidation.js";
import { GovtUserValidation } from "../../validators/GovtUserValidation.js";

const router = Router();
router.post("/auth/signup/govt", checkSchema(GovtUserValidation), signupUser);
router.post("/auth/signup/hospital", checkSchema(HospitalUserValidation), signupUser);

export default router
