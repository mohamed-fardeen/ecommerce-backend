const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create connection to location_db
const locationDbConnection = mongoose.createConnection(process.env.DB_URI_LOCATION);

const locationCoordinatesSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
  lat: { type: Schema.Types.Number, required: true },
  lng: { type: Schema.Types.Number, required: true }
}, {
  timestamps: true
});

const LocationCoordinates = locationDbConnection.model("coordinates", locationCoordinatesSchema);
module.exports = LocationCoordinates;
