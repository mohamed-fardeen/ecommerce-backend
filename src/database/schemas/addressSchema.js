const mongoose = require("mongoose");
const { Schema } = mongoose;

// Only create connection if environment variables are available
let Address;
if (process.env.DB_URI_LOCATION && process.env.DB_URI_LOCATION !== process.env.DB_URI) {
  // Create separate connection for location database
  const locationDbConnection = mongoose.createConnection(process.env.DB_URI_LOCATION);
  
  locationDbConnection.on('connected', () => {
    console.log('Location DB connected for addresses');
  });
  
  locationDbConnection.on('error', (err) => {
    console.log('Location DB connection error for addresses:', err);
  });
  
  Address = locationDbConnection.model("address", new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    addressLine1: { type: Schema.Types.String, required: true },
    addressLine2: { type: Schema.Types.String },
    city: { type: Schema.Types.String, required: true },
    state: { type: Schema.Types.String, required: true },
    postalCode: { type: Schema.Types.String, required: true },
    country: { type: Schema.Types.String, required: true },
    isDefault: { type: Schema.Types.Boolean, default: false }
  }, { timestamps: true }));
} else {
  // Use main connection if no separate location DB is configured
  Address = mongoose.model("address", new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    addressLine1: { type: Schema.Types.String, required: true },
    addressLine2: { type: Schema.Types.String },
    city: { type: Schema.Types.String, required: true },
    state: { type: Schema.Types.String, required: true },
    postalCode: { type: Schema.Types.String, required: true },
    country: { type: Schema.Types.String, required: true },
    isDefault: { type: Schema.Types.Boolean, default: false }
  }, { timestamps: true }));
}

module.exports = Address;
