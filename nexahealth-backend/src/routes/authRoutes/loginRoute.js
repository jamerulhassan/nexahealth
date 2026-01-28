import { Router } from "express";
import  loginUser  from "../../controller/auth.controller.js/loginUser.js";


const router = Router();

router.post("/auth/login", loginUser);

export default router;
