import passport from "passport";
import { Client } from "../database/models/clinets.js";
import { Documents } from "../database/models/document.js";
import { Record } from "../database/models/record.js";
import { where } from "sequelize";
import { Adress } from "../database/models/adress.js";
import { Agreement } from "../database/models/agreement.js";


export const createClient= async (req, res) => {
  const {action, date, infoUser, service, time} = req.body;
  
  try {
    const client = await Client.create(infoUser);
    if(!client){
      return res.status(404).json({message: "Client not created"})
    }
    const records = await Record.findAll();
    const numberTicket = records.length === 0 ? 1 : records.length + 1  
    const newRecord = await Record.create({
      ticket: numberTicket,
      action: action,
      service: service,
      date: date,
      time: time
    }); 

    await client.addRecord(newRecord); 

    const clientWithRecord = await Client.findByPk(client.id, {
      include: [{ model: Record, as: 'record' }] 
    });
    return res.status(201).json(clientWithRecord);
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  }
};

export const getAllClients = async(req, res) => {
  try {
    const clients = await Client.findAll({
      include: [{model: Record, as: "record"}]
    }); 
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
    const client = await Client.findByPk(req.params.id, {
      include: [{model: Record, as: "record"}]
    });
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
    const {name, surname, patronymic, phone} = req.query
    const whereClause = {};
    if (name) whereClause.name = name;
    if (surname) whereClause.surname = surname;
    if (patronymic) whereClause.patronymic = patronymic;
    if (phone) whereClause.phone = phone;
    const candidate = await Client.findOne({where: whereClause});
    if(!candidate) {
      return res.status(404).json({message: "Client not found"})
    }

    const client = await Client.findByPk(candidate.id, {
      include: [{ model: Documents, as: 'document' }, {model: Adress, as: "adress"}, {model: Record, as: "record"}] 
    }); 
    return res.status(200).json(client);  
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  } 
}


export const addDocumentOfClient = async(req, res) => { //проверить работу 
  try {
    const info = JSON.parse(req.body.data);
    const documentFile = req.file.path  
    const {documentType, description, date, street, house, flat} = info;     
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    const newAdress = await Adress.create({street, house, flat})
    const newDocument = await Documents.create({documentType, documentFile, description, date}); 

    await client.addAdress(newAdress);
    await client.addDocument(newDocument);
    
    const clientWithData = await Client.findByPk(req.params.id, {
      include: [{ model: Documents, as: 'document' }, {model: Adress, as: "adress"}, {model: Record, as: "record"}] 
    });
    return res.status(200).json(clientWithData);  
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  } 
}


export const createAgreement = async(req, res) => { //проверить работу 
  const number = +(1777000 + (req.params.id.match(/\d+/g).join("").slice(0, 7)))
  const {title,  passport} = req.body    
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    await client.update({passport: passport})

    const newAgreement = await Agreement.create({number, title});
    
    await client.addAgreement(newAgreement); 
    
    const clientWithData = await Client.findByPk(req.params.id, {
      include: [{ model: Documents, as: 'document' }, {model: Adress, as: "adress"}, {model: Record, as: "record"}] 
    });
    return res.status(200).json(clientWithData);  
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  } 
}

export const deleteBookedOfClient = async(req, res) => {
  try {
    const record = await Record.findOne({where: {clientId: req.params.id}});
    if (!record) {
      return res.status(404).json({message: "Topic not deleted"});
    }
    await record.destroy()
    return res.status(200).json(record);
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  }
}