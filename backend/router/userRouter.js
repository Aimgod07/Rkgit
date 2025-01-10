import express from "express";
import { getALLDoctors,addNewAdmin, login, patientRegister,getUserDetails,logoutAdmin,logoutPatient,addNewDoctor } from "../controller/userController.js";

import{isAdminAuthenticated,isPatientAuthenticated} from "../middlewares/auth.js"
const router=express.Router();

router.post("/patient",patientRegister);
router.post("/login",login);
router.post("/admin/addnew",isAdminAuthenticated,addNewAdmin);
router.post("/doctor/addnew",isAdminAuthenticated,addNewDoctor);
router.get("/doctors",getALLDoctors);

router.get("/patient/me",isPatientAuthenticated,getUserDetails);  
router.get("/admin/me",isAdminAuthenticated,getUserDetails);
router.get("/admin/logout",logoutAdmin);
router.get("/patient/logout",logoutPatient);

export default router;
