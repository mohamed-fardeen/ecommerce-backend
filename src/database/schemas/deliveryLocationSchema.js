const mongoose = require("mongoose");
const { Schema } = mongoose;

const deliveryLocationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
  streetAddress: { type: Schema.Types.String, required: true },
  city: { type: Schema.Types.String, required: true },
  state: { type: Schema.Types.String, required: true },
  postalCode: { type: Schema.Types.String, required: true },
  country: { type: Schema.Types.String, required: true },
  apartment: { type: Schema.Types.String },
  landmark: { type: Schema.Types.String },
  isDefault: { type: Schema.Types.Boolean, default: false }
}, {
  timestamps: true
});

const DeliveryLocation = mongoose.model("DeliveryLocation", deliveryLocationSchema);
module.exports = DeliveryLocation;
