const express = require("express");
const router = express.Router();

const { getAllEmployeeData } = require("../controllers/homeController");

router.get("/", getAllEmployeeData);

module.exports = {
  router,
  getAllEmployeeData,
};
