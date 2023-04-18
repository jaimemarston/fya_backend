export { Solicitud } from './solicitud.model.js';
export { RendicionGastos } from './rendicionGastos.model.js';
export { RendicionGastosProducto } from './rendicionGastosProducto.model.js';
/* export { registroEmpleado} from './registroEmpleado.model.js' */
export { SolicitudProducto } from './solicitudProducto.model.js';
export { RegistroActividad } from './registroActividad.model.js';
export { RegistroProyecto } from './registroProyecto.model.js';
export { RegistroCargo } from './registroCargo.model.js';
/* export { RegistroDocumento } from './registroDocumento.model.js'; */
export { LugarComision } from './lugarComision.model.js';
export { RegistroCodigoReferencia } from "./registroCodigoReferencia.model.js";
export { RegistroPresupuestoFinanciero } from './registroPresupuestoFInanciero.model.js';

export { Usuario } from './user.model.js';
import { registroEmpleado} from './registroEmpleado.model.js'
import { RegistroDocumento } from './registroDocumento.model.js';

registroEmpleado.hasMany(RegistroDocumento, { foreignKey: 'ndocumento' });
RegistroDocumento.belongsTo(registroEmpleado, { foreignKey: 'ndocumento' }); 
export { registroEmpleado} from './registroEmpleado.model.js'
export { RegistroDocumento } from './registroDocumento.model.js';
