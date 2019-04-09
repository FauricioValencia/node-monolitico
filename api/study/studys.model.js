const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const {
  Schema
} = mongoose;

const posibleInquilinoSchema = new Schema({
  tenant: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  state: {
    type: Schema.Types.Boolean,
    default: false
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createDate: {
    type: Schema.Types.Number,
  }
})

posibleInquilinoSchema.methods.toJSON = function () {
  const userThis = this;
  const userObject = userThis.toObject();
  return userObject;
};

posibleInquilinoSchema.plugin(uniqueValidator, {
  message: '{PATH} debe de ser unico'
});

module.exports = mongoose.model('Estudio', posibleInquilinoSchema);