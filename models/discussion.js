'use strict';
module.exports = (sequelize, DataTypes) => {
  const discussion = sequelize.define('discussion', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    usersId: DataTypes.INTEGER,
    anime: DataTypes.STRING
  }, {});
  discussion.associate = function(models) {
    // associations can be defined here
  };
  return discussion;
};