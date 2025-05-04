import { Record } from "../database/models/record.js";



export const getAllRecords = async(req, res) => {
  try {
    const records = await Record.findAll(); 
    if(!records){
      return res.status(404).json({message: "Clients not found"})
    } 
    return res.status(200).json(records);  
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  } 
}

export const createRecord = async (req, res) => {
  const data = req.body;
  
  try {
    const newRecords = await Promise.all(data.map(d => Record.create(d)))
    console.log(newRecords)
    const records = await Record.findAll(); 
    if(!records){
      return res.status(404).json({message: "Records of services not found"})
    }
    return res.status(201).json(records);
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  }
};

