const express = require('express');

const OngController = require('./app/controller/ongController');
const IncidentController = require('./app/controller/IncidentController');
const CaseController = require('./app/controller/CaseController');
const SessionController = require('./app/controller/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.store);

routes.get('/ongs', OngController.index);
routes.get('/ongs/:id', OngController.show);
routes.post('/ongs', OngController.store);

routes.get('/cases', CaseController.index);

routes.get('/incidents', IncidentController.index);
routes.get('/incidents/:id', IncidentController.show);
routes.post('/incidents', IncidentController.store);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;