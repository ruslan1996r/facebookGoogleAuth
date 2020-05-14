const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
const keys = require("../config/keys")
const mongoose = require('mongoose')
const User = mongoose.model('users')

// Strategy - принимает объект с опциями и middleware для верификации пользователя
// serializeUser чтобы сохранять или deserializeUser, чтобы доставать пользовательские данные из сессии
// done (callback) функция, с помощью которой задается результат аутентификации

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

// Google user auth
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientId,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true
    },
        (accessToken, refreshToken, profile, done) => {
            console.log(profile.id, "googleProfileId")
            User.findOne({ userId: profile.id }).then((existingUser) => {
                if (existingUser) {
                    done(null, existingUser)
                } else {
                    new User({
                        userId: profile.id,
                        username: profile.displayName,
                        picture: profile._json.picture
                    })
                        .save()
                        .then(user => done(null, user))
                }
            })
        })
)

// Facebook user auth
passport.use(
    new FacebookStrategy({
        clientID: keys.FACEBOOK_APP_ID,
        clientSecret: keys.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
        proxy: true
    },
        (accessToken, refreshToken, profile, done) => {
            console.log(profile.id, "facebookProfileId")
            User.findOne({ userId: profile.id }).then((existingUser) => {
                if (existingUser) {
                    done(null, existingUser)
                } else {
                    new User({
                        userId: profile.id,
                        username: profile.displayName,
                        picture: profile._json.picture
                    })
                        .save()
                        .then(user => done(null, user))
                }
            })
        })
)
