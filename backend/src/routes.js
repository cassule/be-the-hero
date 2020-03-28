const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./app/controller/ongController');
const IncidentController = require('./app/controller/IncidentController');
const CaseController = require('./app/controller/CaseController');
const SessionController = require('./app/controller/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.store);

routes.get('/ongs', OngController.index);
routes.get('/ongs/:id', OngController.show);

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(9).max(12),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), OngController.store);

routes.get('/cases', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}) , CaseController.index);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}) , IncidentController.index);

routes.get('/incidents/:id', IncidentController.show);
routes.post('/incidents', IncidentController.store);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}) , IncidentController.delete);

module.exports = routes;