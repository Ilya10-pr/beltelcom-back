import { Router } from "express";
import { createRecord, deleteRecord, getAllRecords } from "../controllers/record.js";

export const record = Router()


record.get('/', getAllRecords);
record.post('/', createRecord);
record.delete('/:id', deleteRecord);