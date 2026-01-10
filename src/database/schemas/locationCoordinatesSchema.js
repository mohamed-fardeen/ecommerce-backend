const mongoose = require("mongoose");
const { Schema } = mongoose;

// Only create connection if environment variables are available
let LocationCoordinates;
if (process.env.DB_URI_LOCATION && process.env.DB_URI_LOCATION !== process.env.DB_URI) {
  // Create separate connection for location database
  const locationDbConnection = mongoose.createConnection(process.env.DB_URI_LOCATION);
  
  locationDbConnection.on('connected', () => {
    console.log('Location DB connected');
  });
  
  locationDbConnection.on('error', (err) => {
    console.log('Location DB connection error:', err);
  });
  
  LocationCoordinates = locationDbConnection.model("coordinates", new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    lat: { type: Schema.Types.Number, required: true },
    lng: { type: Schema.Types.Number, required: true }
  }, { timestamps: true }));
} else {
  // Use main connection if no separate location DB is configured
  LocationCoordinates = mongoose.model("coordinates", new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    lat: { type: Schema.Types.Number, required: true },
    lng: { type: Schema.Types.Number, required: true }
  }, { timestamps: true }));
}

module.exports = LocationCoordinates;
