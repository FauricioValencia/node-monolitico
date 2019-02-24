const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const userSchema= new Schema ({
    name:{type: String, required: [true, 'Name necessary']},
    email: {type: String, required: [true, 'Email necessary']},
    password: {type: String, required: [true, 'Password necessary']},
    state: {type: Boolean, required: [true, 'State necessary']}
})

userSchema.methods.toJSON = function () {
    const userThis = this;
    const userObject = userThis.toObject();
    delete userObject.password;
    return userObject;
  };

userSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });

module.exports = mongoose.model('User', userSchema);
