import express from "express";
import { createAppointment,getAppointments,updateAppointment,deleteAppointment } from "../controller/appointmentcontroller.js";
import { isPatientAuthenticated,isAdminAuthenticated } from "../middlewares/auth.js";

const router=express.Router();

router.post("/post",isPatientAuthenticated,createAppointment);
router.get("/getall",isAdminAuthenticated,getAppointments); 
router.put("/update/:id",isAdminAuthenticated,updateAppointment);
router.delete("/delete/:id",isAdminAuthenticated,deleteAppointment);
export default router;

