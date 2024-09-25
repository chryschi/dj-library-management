const tracks = require("../tracks");
const db = require("../db/queries");

const convertUndefinedToFalse = (variable) =>
  variable === undefined ? false : variable;

exports.getAllTracksGet = async (req, res) => {
  const tracks = await db.getAllTracks();

  res.render("index", { title: "DJ Library", tracks });
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
  let { title, artist, bpm, purchasedMp3, purchasedLossless, moodId, keyId } =
    req.body;

  bpm = bpm === "" ? null : bpm;
  purchasedMp3 = convertUndefinedToFalse(purchasedMp3);
  purchasedLossless = convertUndefinedToFalse(purchasedLossless);

  await db.insertTrack({
    title,
    artist,
    bpm,
    mp3: purchasedMp3,
    lossless: purchasedLossless,
    moodId,
    keyId,
  });

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
