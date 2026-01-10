const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create connection to location_db
const locationDbConnection = mongoose.createConnection(process.env.DB_URI_LOCATION);

const addressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
  addressLine1: { type: Schema.Types.String, required: true },
  addressLine2: { type: Schema.Types.String },
  city: { type: Schema.Types.String, required: true },
  state: { type: Schema.Types.String, required: true },
  postalCode: { type: Schema.Types.String, required: true },
  country: { type: Schema.Types.String, required: true },
  isDefault: { type: Schema.Types.Boolean, default: false }
}, {
  timestamps: true
});

const Address = locationDbConnection.model("address", addressSchema);
module.exports = Address;
