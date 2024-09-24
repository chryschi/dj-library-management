require("dotenv").config();
const express = require("express");
const trackRouter = require("./routes/trackRouter");

const app = express();

app.set("view engine", "ejs");

app.use("/", trackRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));
