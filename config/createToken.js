import jwt from "jsonwebtoken";
import { keys } from "./keys.js";

export const createToken = (data) => {
  const payload = {id: data.id, userName: data.userName }
      const token = jwt.sign(payload, keys.secretOrKey, { expiresIn:"3h", algorithm: 'HS256'});
      const user = {
        token: 'Bearer ' + token,
        id: data.id,
        userName: data.userName
    }
  return user
}