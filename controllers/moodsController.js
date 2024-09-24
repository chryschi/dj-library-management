exports.getMoods = (req, res) => {
  res.send("Here all moods in database table will be listed");
};

exports.getMoodById = (req, res) => {
  const id = req.params.moodId;
  res.send(`Here a form for editing mood with id ${id} will be displayed.`);
};

exports.updateMoodPost = (req, res) => {
  const id = req.params.moodId;
  res.send(`Mood with id ${id} updated`);
};

exports.createMoodGet = (req, res) => {
  res.send(`Here a form for creating and adding a new mood will be displayed.`);
};

exports.createMoodPost = (req, res) => {
  res.send(`New mood would be submitted`);
};
