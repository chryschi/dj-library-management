const pool = require("./pool");

const getAllMoods = async () => {
  const { rows } = await pool.query("SELECT * FROM moods");
  return rows;
};

module.exports = {
  getAllMoods,
};
