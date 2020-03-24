const express             = require('express');
const OngController       = require('./controller/OngController');
const IncidentsController = require('./controller/IncidentController');
const ProfileController   = require('./controller/ProfileController');
const SessionController   = require('./controller/SessionController');
const routes              = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);

routes.get('/profile', ProfileController.index);

routes.post('/sessions', SessionController.create);

module.exports = routes;