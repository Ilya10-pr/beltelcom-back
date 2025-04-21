import { DataTypes } from "sequelize";
import { sequelize } from "../connact.js";


export const Packages = sequelize.define('Packages', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: "package"
  },
  typeService: DataTypes.STRING,
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.STRING
}, {
  timestamps: false,
  tableName: 'packages'
});
 
export const Bundle = sequelize.define('Bundle', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'bundle'
});

// Устанавливаем связь: Package имеет много Services
Packages.hasMany(Bundle, {
  foreignKey: 'packageId', // имя поля внешнего ключа в таблице services
  as: 'services', // алиас для использования при eager loading
  onDelete: 'CASCADE' // при удалении пакета удаляются все его услуги
});

// Устанавливаем обратную связь: Service принадлежит Package
Bundle.belongsTo(Packages, {
  foreignKey: 'packageId',
  as: 'package'
});