const tracks = require("../tracks");
const db = require("../db/queries");

exports.getAllTracksGet = (req, res) => {
  res.render("index", { title: "DJ Library", tracks: tracks });
};

exports.viewTrackGet = (req, res) => {
  res.send(
    `Details about track with id ${req.params.trackId} will be displayed here`,
  );
};

exports.createTrackGet = async (req, res) => {
  const moods = await db.getAllMoods();
  const keys = await db.getAllKeys();

  res.render("trackCreate", { title: "Create New Track", moods, keys });
};

exports.createTrackPost = async (req, res) => {
  const { title, artist, bpm, purchasedMp3, purchasedLossless } = req.body;
  await db.insertTrack({ title, artist, bpm, purchasedMp3, purchasedLossless });

  res.redirect("/");
};

exports.updateTrackGet = async (req, res) => {
  const moods = await db.getAllMoods();
  const keys = await db.getAllKeys();

  res.render("trackUpdate", {
    title: "Update Track Info",
    track: tracks[req.params.trackId],
    moods,
    keys,
  });
};

exports.updateTrackPost = (req, res) => {
  res.send("Changes would have been submitted to the database");
};

exports.deleteTrackPost = (req, res) => {
  res.send("This track would have been deleted");
};
