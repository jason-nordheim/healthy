const { Mongoose } = require("mongoose");
const { mongo_url } = require("./app.config");

const mongoClient = new Mongoose();

mongoClient.connection.on(
  "error",
  console.debug.bind(console, "Connection Error:")
);
mongoClient.connection.once("connected", () => {
  //console.debug("Database connection established successfully");
});
mongoClient.connection.once("disconnected", () => {
  //console.debug("Database connection established successfully");
});

const connect = () =>
  mongoClient.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

const disconnect = () => mongoClient.disconnect();

module.exports = {
  mongoClient,
  connect,
  disconnect,
};
