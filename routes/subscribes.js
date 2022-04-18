const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getSubscribe, createSubscribe, deleteMovie,
} = require('../controllers/subscribes');

router.get('/', getSubscribe);
router.post('/', celebrate({
  body: Joi.object().keys({
    date: Joi.string().required(),
    time: Joi.string().required(),
    service: Joi.string().required(),
    master: Joi.string().required(),
  }).unknown(true),
}), createSubscribe);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().min(24).max(24)
      .hex(),
  }).unknown(true),
}), deleteMovie);

module.exports = router;
