const express = require("express")
const app = express()
const mongoose = require("mongoose")
const keys = require("./config/keys")
const passport = require("passport")
const cookieSession = require("cookie-session")

const PORT = process.env.PORT || 5000
require("./models/User")
require("./services/passport")

mongoose.connect(keys.mongoURI, () => {
    console.log("MongoDB connected!")
})

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}))
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoute')(app) //http://localhost:5000/auth/google

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))
    const path = require("path")
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', "build", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log('Server running on ' + PORT)
})