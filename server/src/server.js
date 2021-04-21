const port = require("./config/app.config").port;
require("./config/config.mongoose").connect(); // connect to database
const app = require("./api");

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
