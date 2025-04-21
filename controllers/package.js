import { Packages, Bundle } from "../database/models/package.js";

export const createPackage = async (req, res) => {
  
  try {
    const { name, price, description, typeService } = req.body;
    await Packages.create({
      name,
      price,
      typeService,
      description
    }, {
      include: [{ model: Bundle, as: 'services' }] // указываем, что нужно создать и связанные услуги
    });
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
    await service.destroy();
    const packages = await Packages.findAll();

    res.status(200).json(packages);
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