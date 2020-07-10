'use strict';

const usersFilms = require("./usersFilms");

module.exports = (sequelize, DataTypes) => {
  const film = sequelize.define('film', {
    //PK id
    name: DataTypes.STRING,
    filmId: DataTypes.STRING
  }, {});
  film.associate = function(models) {
    // associations can be defined here
    models.film.belongsToMany(models.user, {through: 'usersFilms'});
  };
  return film;
};