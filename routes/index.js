import { Router } from "express";
import { packages } from "./package.js";
import { services } from "./services.js";
import { auth } from "./auth.js";
import { client } from "./client.js";
import { record } from "./record.js";

export const router = Router()

router.use("/package", packages);
router.use("/service", services);
router.use("/auth", auth);
router.use("/client", client);
router.use("/record", record);