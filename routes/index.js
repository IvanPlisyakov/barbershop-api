const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  login, createUsers,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth.js');
const routerMovies = require('./movies.js');
const routerUsers = require('./users.js');
const routerSubscribes = require('./subscribes.js');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email({ tlds: { allow: false } }),
    phone: Joi.string().required().min(11).max(11),
    password: Joi.string().required().min(8),
  }),
}), createUsers);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8),
  }),
}), login);
router.use('/movies', auth, routerMovies);
router.use('/users', auth, routerUsers);
router.use('/subscribes', auth, routerSubscribes);
router.use(/\//, auth);

module.exports = router;
