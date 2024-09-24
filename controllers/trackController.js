const tracks = require("../tracks");

exports.getAllTracksGet = (req, res) => {
  res.render("index", { title: "DJ Library", tracks: tracks });
};

exports.viewTrackGet = (req, res) => {
  res.send(
    `Details about track with id ${req.params.trackId} will be displayed here`,
  );
};

exports.createTrackGet = (req, res) => {
  res.render("createTrack", { title: "Create New Track" });
};

exports.createTrackPost = (req, res) => {
  res.send("The track would have been submitted to the database");
};

exports.updateTrackGet = (req, res) => {
  res.render("updateTrack", {
    title: "Update Track Info",
    track: tracks[req.params.trackId],
  });
};

exports.updateTrackPost = (req, res) => {
  res.send("Changes would have been submitted to the database");
};
