import Joi from 'joi';
const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const schemaSolicitudProducto = Joi.object({
  fecha: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        errors.forEach((data) => {
          if (data.code === 'any.required') {
            data.message = 'El itinerario de transporte es requerido';
          }
          if (data.code === 'string.empty') {
            data.message = 'El itinerario de transporte no debe estar vació';
          }
        });
      });
      return errors;
    }),
  serie: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        errors.forEach((data) => {
          if (data.code === 'any.required') {
            data.message = 'La serie es requerido';
          }
          if (data.code === 'string.empty') {
            data.message = 'La serie no debe estar vació';
          }
        });
      });
      return errors;
    }),
  numero: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'any.required') {
          data.message = 'El numero es requerido';
        }
        if (data.code === 'string.empty') {
          data.message = 'El numero no debe estar vació';
        }
      });
      return errors;
    }),
  tipo: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'any.required') {
          data.message = 'El tipo es requerido';
        }
        if (data.code === 'string.empty') {
          data.message = 'El tipo no debe estar vació';
        }
      });
      return errors;
    }),
  ruc: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'any.required') {
          data.message = 'El RUC es requerido';
        }
        if (data.code === 'string.empty') {
          data.message = 'El RUC no debe estar vació';
        }
      });
      return errors;
    }),
  descripcion: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'any.required') {
          data.message = 'La descripción es requerido';
        }
        if (data.code === 'string.empty') {
          data.message = 'La descripción no debe estar vació';
        }
      });
      return errors;
    }),
  partidaPresupuestal: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'any.required') {
          data.message = 'La partida presupuestal es requerido';
        }
        if (data.code === 'string.empty') {
          data.message = 'La partida presupuestal no debe estar vació';
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
