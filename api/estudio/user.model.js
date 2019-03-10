const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const posibleInquilinoSchema= new Schema ({
    name:{type: String, required: [true, 'Name necessary']},
    phone:{type: String, required: [true, 'Phone necessary']},
    email: {type: String, required: [true, 'Email necessary']},
    cedula: {type: String, required: [true, 'Cedula necessary']},
})

posibleInquilinoSchema.methods.toJSON = function () {
    const userThis = this;
    const userObject = userThis.toObject();
    return userObject;
  };

posibleInquilinoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });

module.exports = mongoose.model('Estudio', posibleInquilinoSchema);
