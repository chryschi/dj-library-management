const pool = require("./pool");

const queryTrackInfo = `
    SELECT tracks.id AS id
    , tracks.title AS title
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
    `;

const getAllTracks = async () => {
  const { rows } = await pool.query(queryTrackInfo);
  return rows;
};

const getTrackById = async (id) => {
  const { rows } = await pool.query(queryTrackInfo + " WHERE tracks.id = $1", [
    id,
  ]);
  return rows[0];
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

const updateTrack = async ({
  id,
  title,
  artist,
  bpm,
  mp3,
  lossless,
  moodId,
  keyId,
}) => {
  await pool.query(
    `
        UPDATE tracks 
        SET title = $1, artist = $2, bpm = $3, purchased_mp3 = $4, purchased_lossless = $5
        WHERE id = $6
        `,
    [title, artist, bpm, mp3, lossless, id],
  );

  await pool.query("UPDATE track_mood SET mood_id = $1 WHERE track_id = $2", [
    moodId,
    id,
  ]);

  await pool.query("UPDATE track_key SET key_id = $1 WHERE track_id = $2", [
    keyId,
    id,
  ]);
};

const getMoodIdByTrackId = async (id) => {
  const { rows } = await pool.query(
    "SELECT mood_id AS id FROM track_mood WHERE track_id = $1",
    [id],
  );

  return rows[0].id;
};

const getKeyIdByTrackId = async (id) => {
  const { rows } = await pool.query(
    "SELECT key_id AS id FROM track_key WHERE track_id = $1",
    [id],
  );
  return rows[0].id;
};

const deleteTrack = async (id) => {
  // remove track-mood relationship in database
  await pool.query("DELETE FROM track_mood WHERE track_id = $1", [id]);
  // remove track-key relationship in database
  await pool.query("DELETE FROM track_key WHERE track_id = $1", [id]);

  await pool.query("DELETE FROM tracks WHERE id = $1", [id]);
};

module.exports = {
  getAllMoods,
  getAllKeys,
  getAllTracks,
  insertTrack,
  getTrackById,
  updateTrack,
  getKeyIdByTrackId,
  getMoodIdByTrackId,
  deleteTrack,
};
