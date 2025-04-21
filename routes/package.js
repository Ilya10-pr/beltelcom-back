import { Router } from "express";
import { createPackage, deletePackage, getAllPackages, getAllBundle } from "../controllers/package.js";

export const packages = Router()


packages.post('/', createPackage);
packages.get('/', getAllPackages);
// packageServices.get('/:id', getServiceById);
packages.delete('/:id', deletePackage);
packages.get('/bundle', getAllBundle)
