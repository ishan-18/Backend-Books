const {
  getAll,
  create,
  getById,
  update,
  remove,
} = require("../controller/comicbooks.controller");

const router = require("express").Router();

router.route("/").get(getAll).post(create);
router.route("/:id").get(getById).put(update).delete(remove);

module.exports = router;
