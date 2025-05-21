import { DataTypes } from "sequelize";
import { sequelize } from "../connact.js";
import { Services } from "./Services.js";

export const Record = sequelize.define('Records', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  ticket: DataTypes.INTEGER,
  action: DataTypes.STRING(100),
  service: DataTypes.STRING(100),
  date: DataTypes.STRING(100),
  time: DataTypes.STRING(100)
}, {
  timestamps: false,
  tableName: 'record'
});

Record.hasMany(Services, {
  foreignKey: "recordId",
  as: "services",
  onDelete: "CASCADE"
});

Services.belongsTo(Record, {
  foreignKey: "recordId",
  as: "recrod"
})
