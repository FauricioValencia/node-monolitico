const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const myTenantsSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  tenant: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  directionHome: {
    type: Schema.Types.String,
    default: "Dirección de la recidencia"
  }
});

myTenantsSchema.methods.toJSON = () => {
  const userThis = this;
  const userObject = userThis.toObject();
  return userObject;
};
myTenantsSchema.plugin(uniqueValidator, {
  message: "{PATH} debe de ser unico"
});

module.exports = mongoose.model("myTenants", myTenantsSchema);
