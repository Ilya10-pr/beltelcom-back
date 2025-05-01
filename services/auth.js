import bcrypt from "bcryptjs";
import { createToken } from "../config/createToken.js";
import { Employee } from "../database/models/employee.js";


export const getAuthUserService = async (userId) => {
  try {
    const user = await Employee.findOne({
      where: {id: userId},
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return false;
    }
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const registerUserService = async (req) => {
  try { 
    const salt = bcrypt.genSaltSync(10);
    const newUser = await Employee.create({
      name: req.body.name,
      surname: req.body.surname,
      patronymic: req.body.patronymic,
      password: bcrypt.hashSync(req.body.password, salt),
    });
    const authUser = createToken(newUser);
    return authUser
  } catch (error) {
    console.log("Server is not responding:", error)
    return res.status(500).json({ message: "Server is not responding" })
  }
};

export const loginUserService = async (req) => {
  const candidate = await Employee.findOne({ where: { name: req.body.name, surname: req.body.surname } });

  if (candidate) {
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (passwordResult) {
      const authUser = createToken(candidate)

      return authUser
    }
  }
  return false;
};