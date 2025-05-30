import { DataTypes } from "sequelize";
import { sequelize } from "../connact.js";
import { Services } from "./Services.js";
import { Agreement } from "./agreement.js";


export const Packages = sequelize.define('Packages', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(100),
    defaultValue: "package"
  },
  price: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'packages'
});



Packages.hasMany(Agreement, {
  foreignKey: "packageId",
  as: "agreement",
  onDelete: "CASCADE"
})

Agreement.belongsTo(Packages, {
  foreignKey: "packageId",
  as: "package"
})
