import passport from "passport";
import { Client, Documents } from "../database/models/clinets.js";

export const createClient= async (req, res) => {
  
  try {
    const {action, date, infoUser, service} = req.body;
    const {name, surname, patronymic, phone} = infoUser
    const clients = await Client.findAll();
    const numberTicket = clients.length === 0 ? 1 : clients.length + 1  
    const client = await Client.create({numberTicket, name, surname, patronymic, action, date, service, phone});
    if(!client){
      return res.status(404).json({message: "Client not created"})
    }
    return res.status(201).json(client);
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  }
};

export const getAllClients = async(req, res) => {
  try {
    const clients = await Client.findAll(); 
    if(!clients){
      return res.status(404).json({message: "Clients not found"})
    } 
    return res.status(200).json(clients);  
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  } 
}

export const getClientById = async(req, res) => {
  try {
    console.log("getById")
    const client = await Client.findByPk(req.params.id);
    if(!client){
      return res.status(404).json({message: "Clients not found"})
    } 
    return res.status(200).json(client);  
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  } 
}

export const getClientByName = async(req, res) => {
  try {
    const {name, surname, patronymic} = req.query
    const whereClause = {};
    if (name) whereClause.name = name;
    if (surname) whereClause.surname = surname;
    if (patronymic) whereClause.patronymic = patronymic;
    const candidate = await Client.findOne({where: whereClause});
    if(!candidate) {
      return res.status(404).json({message: "Client not found"})
    }

    const client2 = await Client.findByPk(candidate.id, {
      include: [{ model: Documents, as: 'document' }] 
    }); 
    return res.status(200).json(client2);  
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  } 
}


export const addDocumentOfClient = async(req, res) => {
  try {
    console.log("file", req.file)
    const info = JSON.parse(req.body.data);
    const {documentType, description, date, passport} = info;
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    await client.update({ passport: passport });

    const newDocument = await Documents.create({
      documentType: documentType,
      documentFile: req.file.path,
      description: description,
      date: date 
    }); 
 
    await client.addDocument(newDocument); 

    const clientWithDocuments = await Client.findByPk(req.params.id, {
      include: [{ model: Documents, as: 'document' }] 
    });
    return res.status(200).json(clientWithDocuments);  
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  } 
}


export const deleteBookedOfClient = async(req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({message: "Topic not deleted"});
    }
    client.numberTicket = null
    await client.save()
    return res.status(200).json(client);
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  }
}