'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    userId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    discussionId: DataTypes.INTEGER
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
    models.comment.belongsTo(model.discussion)
    models.comment.belongsTo(model.user)

  };
  return comment;
};