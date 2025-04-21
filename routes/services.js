import { Router } from "express";
import { createService, deleteService, getAllServices } from "../controllers/services.js";

export const services = Router()


services.post('/', createService);
services.get('/', getAllServices);
// packageServices.get('/:id', getServiceById);
services.delete('/:id', deleteService);