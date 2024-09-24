require("dotenv").config();
const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.use("/", (req, res) => res.send("Hello World"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));
