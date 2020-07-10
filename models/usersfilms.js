'use strict';
module.exports = (sequelize, DataTypes) => {
  const usersFilms = sequelize.define('usersFilms', {
    userId: DataTypes.INTEGER,
    filmId: DataTypes.INTEGER
  }, {});
  usersFilms.associate = function(models) {
    // associations can be defined here
  };
  return usersFilms;
};