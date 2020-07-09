'use strict';
module.exports = (sequelize, DataTypes) => {
  const film = sequelize.define('film', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  film.associate = function(models) {
    // associations can be defined here
    models.film.belongsTo(models.user)
  };
  return film;
};