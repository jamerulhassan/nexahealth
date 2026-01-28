import { Router } from "express";
import loginRoute from './authRoutes/loginRoute.js'
import logoutRoute from "./authRoutes/logoutRoute.js";
import signinRoute from "./authRoutes/signupRoute.js";
import signoutRoute from "./authRoutes/signoutRoute.js"
import hospitalRoute from "./hospitalRoute/addHospitalRoute.js"
const router = Router()

router.use(loginRoute)
router.use(logoutRoute)
router.use(signinRoute)
router.use(signoutRoute)
router.use(hospitalRoute)

export default router