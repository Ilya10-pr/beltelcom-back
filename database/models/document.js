import { DataTypes } from "sequelize";
import { sequelize } from "../connact.js";

export const Documents = sequelize.define('Documents', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  documentType: DataTypes.STRING(100),
  documentFile: DataTypes.STRING(100),
  description: DataTypes.STRING(100),
  date: DataTypes.DATE
}, {
  timestamps: false,
  tableName: 'documents'
});
