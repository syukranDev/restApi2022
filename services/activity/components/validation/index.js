const Joi = require('Joi')
const utils = require("../utils")
const logger = require("../logger").logger

const filterValidationSchema = Joi.object({
	filter_value: Joi.string().required()
});

module.exports.filterSchema = function filterSchema(req, res, next) {
    const isValid = filterValidationSchema.validate(req.body); // validation post body
    return validateSchema(req, res, next, isValid, 'filterSchema') // for logs
}

const validateSchema = function validateSchema(req, res, next, isValid, schema_name) {
    if (isValid.error){
        logger.error({
          path: schema_name+'/error',
          info: schema_name+' failed',
          err: isValid.error.details[0].message,
      });
      return res.status(200).send(utils.prepareResponse(200, isValid.error.details[0].message, []))
    }
    return next();
  };