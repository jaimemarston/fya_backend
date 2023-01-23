import Joi from 'joi';
const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const schemaSolicitudProducto = Joi.object({
  fecha: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'string.empty') {
          console.log('=>', (data.message = 'La fecha no debe estar vació'));
        }
      });
      return errors;
    }),
  tipo: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'string.empty') {
          console.log('=>', (data.message = 'El tipo no debe estar vació'));
        }
      });
      return errors;
    }),
  numero: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'string.empty') {
          console.log('=>', (data.message = 'El numero no debe estar vació'));
        }
      });
      return errors;
    }),
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
  actividad: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'string.empty') {
          console.log(
            '=>',
            (data.message = 'La actividad no debe estar vació')
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
});

const validateSolicitudProductoSchema = validator(schemaSolicitudProducto);

export { validateSolicitudProductoSchema };
