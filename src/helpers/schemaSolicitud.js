import Joi from 'joi';
const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const schemaSolicitud = Joi.object({
  // numeroSolicitud: Joi.number()
  //   .required()
  //   .error((errors) => {
  //     errors.forEach((data) => {
  //       if (data.code === 'string.empty') {
  //         console.log(
  //           '=>',
  //           (data.message = 'La descripción no debe estar vació')
  //         );
  //       }
  //     });
  //     return errors;
  //   }),
  fechaRegistro: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'string.empty') {
          console.log('=>', (data.message = 'Debe ingresar una fecha'));
        }
      });
      return errors;
    }),
  nombre: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'string.empty') {
          console.log('=>', (data.message = 'Debe ingresar el nombre'));
        }
      });
      return errors;
    }),
  nombreProyecto: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'string.empty') {
          console.log(
            '=>',
            (data.message = 'Debe ingresar el nombre del proyecto')
          );
        }
      });
      return errors;
    }),
  lugarComision: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'string.empty') {
          console.log(
            '=>',
            (data.message = 'Debe ingresar el lugar de comisión')
          );
        }
      });
      return errors;
    }),
  itinerarioTransporte: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'string.empty') {
          console.log(
            '=>',
            (data.message = 'Debe ingresar el lugar de comisión')
          );
        }
      });
      return errors;
    }),
  objetoComision: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'string.empty') {
          console.log(
            '=>',
            (data.message = 'Debe ingresar un objeto de comisión')
          );
        }
      });
      return errors;
    }),
  fechaInicio: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'string.empty') {
          console.log(
            '=>',
            (data.message = 'Debe ingresar la fecha de inicio')
          );
        }
      });
      return errors;
    }),
  fechaFin: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((data) => {
        if (data.code === 'string.empty') {
          console.log('=>', (data.message = 'Debe ingresar la fecha de fin'));
        }
      });
      return errors;
    }),
  estado: Joi.boolean(),
});

const validateSolicitud = validator(schemaSolicitud);

export { validateSolicitud };
