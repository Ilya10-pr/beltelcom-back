import { DataTypes } from "sequelize";
import { sequelize } from "../connact.js";
import { Adress } from "./adress.js";
import { Record } from "./record.js";
import { Agreement } from "./agreement.js";
import { Documents } from "./document.js";


export const Client = sequelize.define(
  "Client",
  {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    surname: {
      type: DataTypes.STRING(50),
    },
    patronymic: DataTypes.STRING(50),
    phone: DataTypes.STRING(50),
    passport: DataTypes.STRING(50),
  },
  {
    tableName: "client",
    timestamps: false,
  }
);



Client.hasMany(Documents, {
  foreignKey: 'clientId', 
  as: 'document', 
  onDelete: 'CASCADE'
});

Documents.belongsTo(Client, {
  foreignKey: 'clientId',
  as: 'client'
});

Client.hasMany(Adress, {
  foreignKey: "clientId",
  as: "adress",
  onDelete: "CASCADE"
})

Adress.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client"
})


Client.hasMany(Record, {
  foreignKey: "clientId",
  as: "record",
  onDelete: "CASCADE"
})

Record.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client"
})


Client.hasMany(Agreement, {
  foreignKey: "clientId",
  as: "agreement",
  onDelete: "CASCADE"
})

Agreement.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client"
})