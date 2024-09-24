const { Router } = require("express");
const trackController = require("../controllers/trackController");
const basicAuth = require("express-basic-auth");

const trackRouter = Router();

trackRouter.get("/", trackController.getAllTracksGet);
trackRouter.get("/create", trackController.createTrackGet);
trackRouter.post("/create", trackController.createTrackPost);

trackRouter.get("/:trackId", trackController.viewTrackGet);

trackRouter.get("/:trackId/update", trackController.updateTrackGet);
trackRouter.post("/:trackId/update", trackController.updateTrackPost);

trackRouter.use(
  basicAuth({
    users: { admin: process.env.ADMIN_PASSWORD },
    challenge: true,
  }),
);
trackRouter.post("/:trackId/delete", trackController.deleteTrackPost);

module.exports = trackRouter;
