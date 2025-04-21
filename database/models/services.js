import { DataTypes } from "sequelize";
import { sequelize } from "../connact.js";



export const Services = sequelize.define('Services', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  category: DataTypes.STRING,
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeService: DataTypes.STRING,
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.STRING,
}, {
  timestamps: false,
  tableName: 'services'
});
