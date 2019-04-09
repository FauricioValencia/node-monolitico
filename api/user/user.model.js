const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const userSchema= new Schema ({
    name:{type: String, required: [true, 'Name necessary']},
    lastName:{type: String, required: [true, 'lastName necessary']},
    email: {type: String, required: [true, 'Email necessary']},
    cedula: {type: String, required: [true, 'Cedula es necesaria perrito']},
    phone: {type: String, required:[true, 'el telefono es necesario bebesita']},
    password: {type: String, required: [true, 'Password necessary']},
    state: {type: Boolean, required: [true, 'State necessary']},
    datos:[],
    isStudy: {type: Boolean, default: false},
    searchHistory: [{type:Schema.Types.ObjectId, ref:'User'}],
})

userSchema.methods.toJSON = function () {
    const userThis = this;
    const userObject = userThis.toObject();
    delete userObject.password;
    return userObject;
  };

userSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });

module.exports = mongoose.model('User', userSchema);
