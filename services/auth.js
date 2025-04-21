import bcrypt from "bcryptjs";
import { createToken } from "../config/createToken.js";
import { Admin } from "../database/models/user.js";


export const getAuthUserService = async (userId) => {
  try {
    const user = await Admin.findOne({
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
    const newUser = await Admin.create({
      name: req.body.name,
      surname: req.body.surname,
      patronymic: req.body.patronymic,
      userName: req.body.userName,
      password: bcrypt.hashSync(req.body.password, salt),
    });
    const authUser = createToken(newUser);
    return authUser
  } catch (error) {
    console.log(error);
  }
};

export const loginUserService = async (req) => {
  const candidate = await Admin.findOne({ where: { name: req.body.name, surname: req.body.surname } });

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