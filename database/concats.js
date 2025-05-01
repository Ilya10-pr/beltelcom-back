
import { Packages } from "./models/package";
import { Services } from "./models/Services";

//  Packages.hasMany(Bundle, {
//   foreignKey: 'packageId', // имя поля внешнего ключа в таблице services
//   as: 'services', // алиас для использования при eager loading
//   onDelete: 'CASCADE' // при удалении пакета удаляются все его услуги
// });
// // Устанавливаем обратную связь: Service принадлежит Package
// Bundle.belongsTo(Packages, {
//   foreignKey: 'packageId',
//   as: 'package'
// });

