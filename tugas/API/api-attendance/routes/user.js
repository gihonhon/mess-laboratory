const express = require("express");
const router = express.Router();
const user = require("../services/user");

router.get("/", async function (req, res, next) {
  try {
    res.json(await user.getAllUsers());
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    res.json(await user.createUser(req.body));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

router.patch("/", async function (req, res, next) {
  try {
    res.json(await user.updateUser(req.body));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

router.delete("/", async function (req, res, next) {
  try {
    res.json(await user.deleteUser(req.body));
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

module.exports = router;
