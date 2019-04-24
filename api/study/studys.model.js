const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const posibleInquilinoSchema = new Schema({
  tenant: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  state: {
    type: Schema.Types.Boolean,
    default: false
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  createDate: {
    type: Schema.Types.String,
    default: ""
  },
  proceso: {
    type: Schema.Types.Number,
    default: 0
  },
  phoneTenant: {
    type: Schema.Types.String,
    default: ""
  },
  emailTenant: {
    type: Schema.Types.String,
    default: ""
  }
});

posibleInquilinoSchema.methods.toJSON = function() {
  const userThis = this;
  const userObject = userThis.toObject();
  return userObject;
};

posibleInquilinoSchema.plugin(uniqueValidator, {
  message: "{PATH} debe de ser unico"
});

module.exports = mongoose.model("UserStudy", posibleInquilinoSchema);
