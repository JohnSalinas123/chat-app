const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const { Schema } = mongoose;

const userSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}, 
{ timestamps: true });


// middleware to hash user password on creation/modification
userSchema.pre('save', function(next) {
    const user = this

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, (saltError, salt) => {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(user.password, salt, (hashError, hash) => {
                    if (hashError) {
                        return next(hashError)
                    }

                    user.password = hash
                    next()

                })
            }
        })


    } else {
        return next()
    }


})


module.exports = mongoose.model('User', userSchema);


