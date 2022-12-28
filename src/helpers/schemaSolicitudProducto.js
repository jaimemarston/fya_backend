import Joi from 'joi';
const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const schemaSolicitudProducto = Joi.object({
  descripcion: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'string.empty') {
          console.log(
            '=>',
            (data.message = 'La descripción no debe estar vació')
          );
        }
      });
      return errors;
    }),
  partidaPresupuestal: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'string.empty') {
          console.log(
            '=>',
            (data.message = 'La partida presupuestal no debe estar vació')
          );
        }
      });
      return errors;
    }),
  importe: Joi.number()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'number.base') {
          console.log('=>', (data.message = 'Debe ingresar números'));
        }
      });
      return errors;
    }),
  estado: Joi.boolean(),
  solicitudId: Joi.number()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'number.base') {
          console.log(
            '=>',
            (data.message = 'Debe ingresar el Id de la solicitud')
          );
        }
        if (data.code === 'any.required') {
          console.log('=>', (data.message = 'Solicitud Id es requerida'));
        }
      });
      return errors;
    }),
});

const validateSolicitudProductoSchema = validator(schemaSolicitudProducto);

export { validateSolicitudProductoSchema };
