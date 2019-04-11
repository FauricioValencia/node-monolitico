const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const comments = new Schema({
  authorComment: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  tenant: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  dateComment: {
    type: Schema.Types.Number
  }
});

comments.methods.toJSON = function() {
  const userThis = this;
  const userObject = userThis.toObject();
  return userObject;
};

comments.plugin(uniqueValidator, {
  message: "{PATH} debe de ser unico"
});

module.exports = mongoose.model("Comments", comments);
