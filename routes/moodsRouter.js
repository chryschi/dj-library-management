const { Router } = require("express");
const moodsController = require("../controllers/moodsController");

const moodsRouter = Router();

moodsRouter.get("/", moodsController.getMoods);
moodsRouter.get("/new", moodsController.createMoodGet);
moodsRouter.post("/new", moodsController.createMoodPost);
moodsRouter.get("/:moodId/update", moodsController.getMoodById);
moodsRouter.post("/:moodId/update", moodsController.updateMoodPost);

module.exports = moodsRouter;
