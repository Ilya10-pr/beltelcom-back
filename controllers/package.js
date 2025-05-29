import { Packages } from "../database/models/package.js";
import { Services } from "../database/models/Services.js";
import { PackagesAndServices } from "../database/models/packageAndServices.js";



export const createPackage = async (req, res) => {
  const { name, price, type, services } = req.body;

  try {
    // Валидация
    if (!services || !Array.isArray(services) || services.length === 0) {
      return res.status(400).json({ message: "services must be a non-empty array of service IDs" });
    }

    // Создание пакета
    const newPackage = await Packages.create({ name, price, type });
 
    await newPackage.addServices(services.map(s => s.id || s));
    // Получение всех пакетов с включенными в них сервисами
    const allPackages = await Packages.findAll({
      include: [{ model: Services, as: "services" }]
    });

    return res.status(201).json(allPackages);
  } catch (error) {
    console.error("Server is not responding:", error);
    return res.status(500).json({ message: "Server is not responding" });
  }
};


 
export const getAllPackages = async(req, res) => {
  try {
    const packages = await Packages.findAll({include: [{model: Services, as: "services"}]});
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