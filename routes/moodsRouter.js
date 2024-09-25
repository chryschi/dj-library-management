const { Router } = require("express");
const moodsController = require("../controllers/moodsController");
const basicAuth = require("express-basic-auth");

const moodsRouter = Router();

moodsRouter.get("/", moodsController.getMoods);
moodsRouter.get("/new", moodsController.createMoodGet);
moodsRouter.post("/new", moodsController.createMoodPost);
moodsRouter.get("/:moodId/update", moodsController.getMoodById);
moodsRouter.post("/:moodId/update", moodsController.updateMoodPost);

moodsRouter.use(
  basicAuth({
    users: { admin: process.env.ADMIN_PASSWORD },
    challenge: true,
  }),
);
moodsRouter.post("/:moodId/delete", moodsController.deleteMoodPost);

module.exports = moodsRouter;
