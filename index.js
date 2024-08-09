require("dotenv").config();

const express = require("express");
const authRoute = require("./routes/authRoute");
const app = express();
app.use(express.json());
port = process.env.PORT || 3000;

app.get("/user", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", authRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
