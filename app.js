require("dotenv").config();
const express = require("express");
const trackRouter = require("./routes/trackRouter");
const moodsRouter = require("./routes/moodsRouter");

const app = express();

app.use("/assets", express.static("assets"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/tracks", trackRouter);
app.use("/moods", moodsRouter);
app.use("/", (req, res) => res.redirect("/tracks"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));
