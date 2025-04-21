import { Services } from "../database/models/Services.js";

export const createService = async (req, res) => {
  
  try {
    const { name, price, typeService, category, description } = req.body;
    await Services.create({
      name,
      price,
      typeService,
      category,
      description
    });
    const services = await Services.findAll();
    if(!services){
      return res.status(404).json({message: "Services of services not found"})
    }
    return res.status(201).json(services);
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  }
};

export const getAllServices = async(req, res) => {
  try {
    const services = await Services.findAll();
    if(!services){
      return res.status(404).json({message: "Services of services not found"})
    }
    return res.status(200).json(services);
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  }
}

export const deleteService = async(req, res) => {
  try {
    const service = await Services.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({message: "Service not deleted"});
    }
    await service.destroy();
    const services = await Services.findAll();

    res.status(200).json(services);
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  }
}