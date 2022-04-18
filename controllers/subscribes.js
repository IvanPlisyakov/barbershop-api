const Subscribe = require('../models/subscribe.js');
const NotFoundError = require('../errors/not-found-err');
const CommonError = require('../errors/common-err');

const getSubscribe = (req, res, next) => {
  Subscribe.find({ owner: req.user._id })
    .then((subscribe) => { res.status(200).send(subscribe); })
    .catch(next);
};

const createSubscribe = (req, res, next) => {
  console.log("yes")
  const {
    date, time, service, master
  } = req.body;
  Subscribe.findOne({ date, time, master })
    .then((subscribe) => {
      if (!subscribe) {
        return Subscribe.create({
          date,
          time, 
          service, 
          master,
          owner: req.user._id,
        })
          .then((readySubscribe) => {
            // console.log(readyMovie);
            return res.status(200).send(readySubscribe);
          })
          .catch(next);
      }

      throw new CommonError('Such a film already exists', 409);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (String(movie.owner) !== req.user._id) {
        throw new CommonError("You can't delete other people's movies", 403);
      }

      return Movie.findByIdAndRemove(req.params.movieId)
        .then(() => {
          res.status(200).send(movie);
        });
    })
    .catch(next);
};

module.exports = {
  getSubscribe, createSubscribe, deleteMovie,
};
