import { DataTypes } from "sequelize";
import { sequelize } from "../connact.js";
import { Documents } from "./document.js";

export const Agreement = sequelize.define('Agreements', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  number: DataTypes.BIGINT,
  title: DataTypes.STRING(100),
}, {
  timestamps: true,
  tableName: 'agreements'
});


Agreement.hasMany(Documents, {
  foreignKey: "agreementId",
  as: "document",
  onDelete: "CASCADE"
})
 
Documents.belongsTo(Agreement,{
  foreignKey:"agreementId",
  as: "agreement"
})