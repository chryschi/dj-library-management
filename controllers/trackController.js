const db = require("../db/queries");

const convertUndefinedToFalse = (variable) =>
  variable === undefined ? false : variable;

exports.getAllIndexInfo = async (req, res) => {
  let tracks;

  if (req.query.search) {
    tracks = await db.getTracksByString(req.query.search);
  } else {
    tracks = await db.getAllTracks();
  }

  const keys = await db.getAllKeys();
  const moods = await db.getAllMoods();

  res.render("tracks", { title: "DJ Library", tracks, keys, moods });
};

exports.viewTrackGet = async (req, res) => {
  const track = await db.getTrackById(req.params.trackId);
  res.render("trackView", { title: "Track Details", track });
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
  const trackId = req.params.trackId;
  const moods = await db.getAllMoods();
  const keys = await db.getAllKeys();
  const track = await db.getTrackById(trackId);
  const keyId = await db.getKeyIdByTrackId(trackId);
  const moodId = await db.getMoodIdByTrackId(trackId);

  res.render("trackUpdate", {
    title: "Update Track Info",
    track: { ...track, keyId, moodId, id: trackId },
    moods,
    keys,
  });
};

exports.updateTrackPost = async (req, res) => {
  const trackId = req.params.trackId;
  let { title, artist, bpm, purchasedMp3, purchasedLossless, moodId, keyId } =
    req.body;
  bpm = bpm === "" ? null : bpm;
  purchasedMp3 = convertUndefinedToFalse(purchasedMp3);
  purchasedLossless = convertUndefinedToFalse(purchasedLossless);

  await db.updateTrack({
    id: trackId,
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

exports.deleteTrackPost = async (req, res) => {
  await db.deleteTrack(req.params.trackId);
  res.redirect("/");
};
