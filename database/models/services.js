import { DataTypes } from "sequelize";
import { sequelize } from "../connact.js";
import { Agreement } from "./agreement.js";



export const Services = sequelize.define('Services', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  category: DataTypes.STRING(50),
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  type: DataTypes.STRING(100),
  description: DataTypes.STRING(100),
}, {
  timestamps: false,
  tableName: 'services'
});


Services.hasMany(Agreement, {
  foreignKey: "servicesId",
  as: "agreement",
  onDelete: "CASCADE"
})

Agreement.belongsTo(Services, {
  foreignKey: "servicesId",
  as: "service"
})