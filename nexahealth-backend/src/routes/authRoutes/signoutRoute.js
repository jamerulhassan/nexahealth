import { Router } from "express";
import signoutUser from "../../controller/auth.controller.js/signoutUser.js";

const router = Router();
console.log("hi");

router.post("/auth/signout", signoutUser)

export default router;