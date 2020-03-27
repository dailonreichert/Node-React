const express                    = require('express');
const OngController              = require('./controller/OngController');
const IncidentsController        = require('./controller/IncidentController');
const ProfileController          = require('./controller/ProfileController');
const SessionController          = require('./controller/SessionController');
const {celebrate, Segments, Joi} = require('celebrate');
const routes                     = express.Router();

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({[Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)    
})}), OngController.create);

routes.get('/incidents', celebrate({[Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
})}) ,IncidentsController.index);

routes.post('/incidents', celebrate({
    [Segments.HEADERS] : Joi.object({ 
        authorization : Joi.string().required()}).unknown(),
    [Segments.BODY]  : Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value : Joi.number().required()
})}), IncidentsController.create);

routes.delete('/incidents/:id', celebrate({[Segments.PARAMS] : Joi.object().keys({
    id : Joi.number().required()
})}),IncidentsController.delete);

routes.get('/profile', celebrate({[Segments.HEADERS] : Joi.object({
    authorization : Joi.string().required()
}).unknown()}), ProfileController.index);

routes.post('/sessions', SessionController.create);

module.exports = routes;