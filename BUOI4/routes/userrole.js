const { fail } = require("assert");
var express = require("express");
var router = express.Router();
let userroleSchema = require("../models/userrole");
let BuildQueies = require("../Utils/BuildQuery");

//http://localhost:3000/products?name=iph&price[$gte]=1600&price[$lte]=3000
/* GET users listing. */
router.get("/", async function (req, res, next) {
  let queries = req.query;
  let userroles = await userroleSchema.find({ isDeleted: false });
  res.send(userroles);
});
router.get("/:id", async function (req, res, next) {
  try {
    let userrole = await userroleSchema.findById(req.params.id);
    res.status(200).send({
      success: true,
      data: userrole,
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
  let newUserrole = new userroleSchema({
    
  });
  await newUserrole.save();
  res.send(newUserrole);
});
router.put("/:id", async function (req, res, next) {
  try {
    let body = req.body;
    let userrole = await userroleSchema.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    res.status(200).send({
      success: true,
      data: userrole,
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
    let userrole = await userroleSchema.findByIdAndUpdate(
      req.params.id,
      { new: true }
    );
    res.status(200).send({
      success: true,
      data: userrole,
    });
  } catch (error) {
    res.status(404).send({
      success: fail,
      message: error.message,
    });
  }
});

module.exports = router;