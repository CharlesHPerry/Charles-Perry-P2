//user model decleration

'use strict';
const bcrypt = require('bcrypt');

//delcare model format
module.exports = function(sequelize, DataTypes) {
    //define user object
    const user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Invalid email address'
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 99],
                    msg: 'Name must be between 1 and 99 characters'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [8, 99],
                    msg: 'Password is of incorrect length. Double check charater number.'
                }
            }
        }
    }, {
        hooks: {
            //before record creation
            beforeCreate: function(createdUser, options) {
                if (createdUser && createdUser.password) {
                    let hash = bcrypt.hashSync(createdUser.password, 12);
                    createdUser.password = hash;
                }
            }
        }
    });
    user.associate = function(models) {
        // TODO: any user association you want
        models.user.hasMany(models.discussion)
        models.user.belongsToMany(models.film, {through: 'usersFilms'})
        models.user.hasMany(models.comment)
    }
    // valid password definition to validate password
    user.prototype.validPassword = function(passwordTyped) {
        return bcrypt.compareSync(passwordTyped, this.password);
    }
    //remove password before serialization of user
    user.prototype.toJSON = function() {
        let userData = this.get();
        delete userData.password;
        return userData;
    }
    return user;
};   