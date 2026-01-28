import { Router } from "express";
import  logoutUser  from "../../controller/auth.controller.js/logoutUser.js";

const router = Router();

router.post("/auth/logout", logoutUser);

export default router;