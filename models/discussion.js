'use strict';
module.exports = (sequelize, DataTypes) => {
  const discussion = sequelize.define('discussion', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    film: DataTypes.STRING
  }, {});
  discussion.associate = function(models) {
    // associations can be defined here
    models.discussion.hasMany(models.comment)
    models.discussion.belongsTo(model.user)
  };
  return discussion;
};