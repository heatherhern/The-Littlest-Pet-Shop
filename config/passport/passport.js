let bCrypt = require('bcrypt');
let passport = require("passport");


// function to be called while there is a new sign/signup 
// We are using passport local signin/signup strategies for our app
module.exports = function (passport, auth) {
    let Auth = auth;

    let LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(

        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback

        }, function (req, email, password, done) {
            console.log("Signup for - ", email)
            let generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

            }
            Auth.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                //console.log(user);
                if (user) {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else {
                    let userPassword = generateHash(password);
                    let data = {
                        email: email,
                        password: userPassword,
                        name: req.body.name,
                    };

                    Auth.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }

                    });
                }
            });
        }
    ));


    //Local Signin
    passport.use('local-signin', new LocalStrategy(

        {

            // by default, local strategy uses username and password, we will override with email

            usernameField: 'email',

            passwordField: 'password',

            passReqToCallback: true // allows us to pass back the entire request to the callback

        },


        function (req, email, password, done) {

            var Auth = auth;

            var isValidPassword = function (userpass, password) {

                return bCrypt.compareSync(password, userpass);

            }
            console.log("logged to", email)
            Auth.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                console.log(user.id)
                if (!user) {

                    return done(null, false, {
                        message: 'Email does not exist'
                    });

                }

                if (!isValidPassword(user.password, password)) {

                    return done(null, false, {
                        message: 'Incorrect password.'
                    });

                }


                var userinfo = user.get();
                return done(null, userinfo);


            }).catch(function (err) {

                console.log("Error:", err);

                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });

            });


        }

    ));

    //serialize
    passport.serializeUser(function (auth, done) {

        done(null, auth.id);

    });

    // deserialize user 
    passport.deserializeUser(function (id, done) {

        Auth.findOne({where: {id: id}}).then(function (user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }

        });

    });


}