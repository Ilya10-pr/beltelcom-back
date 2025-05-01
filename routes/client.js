import { Router } from "express";
import { addDocumentOfClient, createAgreement, createClient, deleteBookedOfClient, getAllClients, getClientById, getClientByName } from "../controllers/client.js";
import multer from "../middleware/multer.js";

export const client = Router()


client.post('/', createClient);
client.get('/', getAllClients);
client.get('/search', getClientByName);
client.get('/:id', getClientById);
client.delete('/:id', deleteBookedOfClient);
client.put('/:id',multer.single("file"), addDocumentOfClient);
client.put('/agreement/:id', createAgreement);