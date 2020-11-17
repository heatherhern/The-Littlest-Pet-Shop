const db = require("../../models");
const bcrypt = require("bcrypt");

//email, password, output user

module.exports = {
    login: function (userObj) {
        return new Promise((res, rej) => {
            db.User.findOne({ where: { email: userObj.email } }).then(function (result) {
                if (result) {
                    bcrypt.compare(userObj.password, result.password).then(function (condition) {
                        if (condition) {
                            res({
                                id: result.dataValues.id,
                                name: result.dataValues.name,
                                email: result.dataValues.email
                            });
                        } else {
                            rej('Incorrect password');
                        }
                    });
                } else {
                    rej('Incorrect email')
                }

            });
        })
    },
    register: function (userObj) {
        return new Promise((res, rej) => {
            db.User.findOne({where: {email: userObj.email}}).then(function(result){
                if(result){
                    rej('Email already in use')
                }else{
                    bcrypt.hash(userObj.password, 10).then(function (hashedPass) {
                        userObj.password = hashedPass;
                        db.User.create(userObj).then(function (result) {
                            res({
                                id: result.dataValues.id,
                                name: result.dataValues.name,
                                email: result.dataValues.email
                            });
                        })
                    });
                }
            })
        })
    }
};