const pool = require("./pool");

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
