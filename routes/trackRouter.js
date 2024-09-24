const { Router } = require("express");
const trackController = require("../controllers/trackController");
const trackRouter = Router();

trackRouter.get("/", trackController.getAllTracksGet);
trackRouter.get("/create", trackController.createTrackGet);
trackRouter.post("/create", trackController.createTrackPost);
trackRouter.get("/update", trackController.updateTrackGet);
trackRouter.post("/update", trackController.updateTrackPost);

trackRouter.get("/track/:trackId", trackController.viewTrackGet);

module.exports = trackRouter;
