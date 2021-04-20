require("./dotenv.config");

module.exports = {
  port: process.env.NODE_ENV || 5000,
  mode: process.env.NODE_ENV || "development",
  saltRounds: 12,
  jwtKey: process.env.JWT_PRIVATE_KEY,
  jwtOptions: {
    expiresIn: "24h",
  },
  mongo_url: process.env.MONGO_DB_URL,
  google: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    callback_url: process.env.GOOGLE_CALLBACK_URL,
  },
};
