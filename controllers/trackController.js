const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const alphanumErr = "must only contain letters or numbers.";
const lengthErr = "must be between 1 and 30 characters.";
const bpmErr = "must be between 0 and 300.";

const validateUser = [
  body("title")
    .trim()
    .isAlphanumeric()
    .withMessage(`Title ${alphanumErr}`)
    .isLength({ min: 1, max: 30 })
    .withMessage(`Title ${lengthErr}`),
  body("artist")
    .trim()
    .isAlphanumeric()
    .withMessage(`Artist name ${alphanumErr}`)
    .isLength({ min: 1, max: 30 })
    .withMessage(`Artist name ${lengthErr}`),
  body("bpm").isInt({ min: 0, max: 300 }).withMessage(`Bpm ${bpmErr}`),
];

const convertUndefinedToFalse = (variable) =>
  variable === undefined ? false : variable;

exports.getAllIndexInfo = async (req, res) => {
  let tracks;
  const { str, keyId, moodId } = req.query;
  console.log(req.query);

  if (str !== undefined || keyId !== undefined || moodId !== undefined) {
    tracks = await db.getTracksBySearch({ str, keyId, moodId });
  } else {
    tracks = await db.getAllTracks();
  }

  const selectedFilter = { str, keyId, moodId };

  const keys = await db.getAllKeys();
  const moods = await db.getAllMoods();
  console.log(tracks);

  res.render("tracks", {
    title: "DJ Library",
    tracks,
    keys,
    moods,
    selectedFilter,
  });
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

exports.createTrackPost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    let { title, artist, bpm, purchasedMp3, purchasedLossless, moodId, keyId } =
      req.body;
    if (!errors.isEmpty()) {
      const moods = await db.getAllMoods();
      const keys = await db.getAllKeys();
      return res.status(400).render("trackCreateValidate", {
        title: "Create New Track",
        moods,
        keys,
        track: {
          title,
          artist,
          bpm,
          purchasedMp3,
          purchasedLossless,
          moodId,
          keyId,
        },
        errors: errors.array(),
      });
    }

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
  },
];

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

exports.updateTrackPost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    const trackId = req.params.trackId;
    let { title, artist, bpm, purchasedMp3, purchasedLossless, moodId, keyId } =
      req.body;

    purchasedMp3 = convertUndefinedToFalse(purchasedMp3);
    purchasedLossless = convertUndefinedToFalse(purchasedLossless);

    if (!errors.isEmpty()) {
      const moods = await db.getAllMoods();
      const keys = await db.getAllKeys();
      return res.status(400).render("trackUpdateValidate", {
        title: "Update Track Info",
        moods,
        keys,
        track: {
          title,
          artist,
          bpm,
          purchasedMp3,
          purchasedLossless,
          moodId,
          keyId,
        },
        errors: errors.array(),
      });
    }

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
  },
];

exports.deleteTrackPost = async (req, res) => {
  await db.deleteTrack(req.params.trackId);
  res.redirect("/");
};
