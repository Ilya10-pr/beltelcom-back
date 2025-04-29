import { DataTypes } from "sequelize";
import { sequelize } from "../connact.js";


export const Client = sequelize.define(
  "Client",
  {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    numberTicket: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
    },
    surname: {
      type: DataTypes.STRING,
    },
    patronymic: DataTypes.STRING,
    phone: DataTypes.STRING,
    passport: DataTypes.STRING,
    date: DataTypes.STRING,
    service: DataTypes.STRING,
    action: DataTypes.STRING
  },
  {
    tableName: "client",
    timestamps: false,
  }
);


export const Documents = sequelize.define('Documents', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  documentType: DataTypes.STRING,
  documentFile: DataTypes.STRING,
  description: DataTypes.STRING,
  date: DataTypes.STRING
}, {
  timestamps: true,
  tableName: 'documents'
});

Client.hasMany(Documents, {
  foreignKey: 'clientId', // имя поля внешнего ключа в таблице services
  as: 'document', // алиас для использования при eager loading
  onDelete: 'CASCADE' // при удалении пакета удаляются все его услуги
});

Documents.belongsTo(Client, {
  foreignKey: 'clientId',
  as: 'client'
});