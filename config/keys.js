// module.exports = {
//     googleClientId: "931533933845-uk98164q4ko4jstt2fbme20jr81u5jtn.apps.googleusercontent.com",
//     googleClientSecret: "ZJlb3VBJL9uZKrtlBQ5p3RAQ"
// }
if (process.env.NODE_ENV === 'production') {
    module.exports = require("./prod")
} else {
    module.exports = require("./dev")
}