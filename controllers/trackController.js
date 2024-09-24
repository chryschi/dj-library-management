exports.getAllTracksGet = (req, res) => {
  res.send("All tracks are displayed here");
};

exports.createTrackGet = (req, res) => {
  res.send("This is the page for creating and submit tracks to the library");
};

exports.createTrackPost = (req, res) => {
  res.send("The track would have been submitted to the database");
};

exports.updateTrackGet = (req, res) => {
  res.send("This is the page for updating track info");
};

exports.updateTrackPost = (req, res) => {
  res.send("Changes would have been submitted to the database");
};
