const app = require("./app");
const config = require("./utils/config");

const PORT = config.PORT;

app.listen(PORT, (req, res) => {
  console.log(`server started on port ${PORT}`);
});
