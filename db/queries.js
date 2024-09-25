const pool = require("./pool");

const insertTrack = async ({
  title,
  artist,
  bpm,
  mp3,
  lossless,
  moodId,
  keyId,
}) => {
  const rowInfo = await pool.query(
    "INSERT INTO tracks (title, artist, bpm, purchased_mp3, purchased_lossless) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [title, artist, bpm, mp3, lossless],
  );

  const trackId = rowInfo.rows[0].id;

  await pool.query(
    "INSERT INTO track_mood (track_id, mood_id) VALUES ($1, $2)",
    [trackId, moodId],
  );

  await pool.query("INSERT INTO track_key (track_id, key_id) VALUES ($1, $2)", [
    trackId,
    keyId,
  ]);
};

const getAllMoods = async () => {
  const { rows } = await pool.query("SELECT * FROM moods");
  return rows;
};

const getAllKeys = async () => {
  const { rows } = await pool.query("SELECT * FROM keys");
  return rows;
};

module.exports = {
  getAllMoods,
  getAllKeys,
  insertTrack,
};
