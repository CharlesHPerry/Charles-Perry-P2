'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    discussionId: DataTypes.INTEGER
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
    models.comment.belongsTo(models.discussion)
    models.comment.belongsTo(models.user)

  };
  return comment;
};