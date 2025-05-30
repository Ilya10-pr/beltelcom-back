import { DataTypes } from "sequelize";
import { sequelize } from "../connact.js";
import { Services } from "./Services.js";
import { Packages } from "./package.js";


export const PackagesAndServices = sequelize.define('PackagesAndServices', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'packagesAndServices'
}); 


Packages.belongsToMany(Services, { through: PackagesAndServices, as: "services" });
Services.belongsToMany(Packages, { through: PackagesAndServices, as: "packages" });

