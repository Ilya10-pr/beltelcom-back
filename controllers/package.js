import { Packages, Bundle } from "../database/models/package.js";

export const createPackage = async (req, res) => {
  
  try {
    await Packages.create(req.body);
    const packages = await Packages.findAll();
    if(!packages){
      return res.status(404).json({message: "Packages of services not found"})
    }
    return res.status(201).json(packages);
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  }
};

export const getAllPackages = async(req, res) => {
  try {
    const packages = await Packages.findAll();
    if(!packages){
      return res.status(404).json({message: "Packages of services not found"})
    }
    return res.status(200).json(packages); 
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  }
}

export const deletePackage = async(req, res) => {
  try {
    const service = await Packages.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({message: "Topic not deleted"});
    }
    const response = await service.destroy();
    return res.status(200).json(response);
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  }
}


export const getAllBundle = async (req, res) => {
  try {
    const services = await Bundle.findAll();
    if(!services){
      return res.status(404).json({message: "Services of services not found"})
    }
    return res.status(200).json(services);
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  }
} 