const pool = require("./pool");

const getAllTracks = async () => {
  const { rows } = await pool.query(`

    SELECT tracks.title AS title
    , tracks.artist AS artist
    , tracks.bpm AS bpm
    , tracks.purchased_mp3 AS mp3
    , tracks.purchased_lossless AS lossless
    , moods.mood AS mood
    , keys.key AS key
    , keys.key_camelot AS keyCamelot 
    FROM tracks 
    INNER JOIN track_key ON tracks.id = track_key.track_id
    INNER JOIN track_mood ON tracks.id = track_mood.track_id
    INNER JOIN moods ON track_mood.mood_id = moods.id
    INNER JOIN keys ON track_key.key_id = keys.id
    `);
  return rows;
};

const getAllMoods = async () => {
  const { rows } = await pool.query("SELECT * FROM moods");
  return rows;
};

const getAllKeys = async () => {
  const { rows } = await pool.query("SELECT * FROM keys");
  return rows;
};

const insertTrack = async ({
  title,
  artist,
  bpm,
  mp3,
  lossless,
  moodId,
  keyId,
}) => {
  const { rows } = await pool.query(
    "INSERT INTO tracks (title, artist, bpm, purchased_mp3, purchased_lossless) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [title, artist, bpm, mp3, lossless],
  );

  const trackId = rows[0].id;

  await pool.query(
    "INSERT INTO track_mood (track_id, mood_id) VALUES ($1, $2)",
    [trackId, moodId],
  );

  await pool.query("INSERT INTO track_key (track_id, key_id) VALUES ($1, $2)", [
    trackId,
    keyId,
  ]);
};
module.exports = {
  getAllMoods,
  getAllKeys,
  getAllTracks,
  insertTrack,
};
