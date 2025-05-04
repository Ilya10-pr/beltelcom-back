import { Router } from "express";
import { createRecord, getAllRecords } from "../controllers/record.js";

export const record = Router()


record.get('/', getAllRecords);
record.post('/', createRecord)