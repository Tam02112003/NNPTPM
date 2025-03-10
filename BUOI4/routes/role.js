const { fail } = require("assert");
var express = require("express");
var router = express.Router();
let roleSchema = require("../models/role");
let BuildQueies = require("../Utils/BuildQuery");

//http://localhost:3000/products?name=iph&price[$gte]=1600&price[$lte]=3000
/* GET users listing. */
router.get("/", async function (req, res, next) {
  let queries = req.query;
  let roles = await roleSchema.find({ isDeleted: false });
  res.send(roles);
});
router.get("/:id", async function (req, res, next) {
  try {
    let role = await roleSchema.findById(req.params.id, {
      isDeleted: false,
    });
    res.status(200).send({
      success: true,
      data: role,
    });
  } catch (error) {
    res.status(404).send({
      success: fail,
      message: error.message,
    });
  }
});
router.post("/", async function (req, res, next) {
  let body = req.body;
  console.log(body);
  let newRole = new roleSchema({
    roleName: body.roleName,
  });
  await newRole.save();
  res.send(newRole);
});
router.put("/:id", async function (req, res, next) {
  try {
    let body = req.body;
    let role = await roleSchema.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    res.status(200).send({
      success: true,
      data: role,
    });
  } catch (error) {
    res.status(404).send({
      success: fail,
      message: error.message,
    });
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    let role = await roleSchema.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    res.status(200).send({
      success: true,
      data: role,
    });
  } catch (error) {
    res.status(404).send({
      success: fail,
      message: error.message,
    });
  }
});
module.exports = router;