var express = require('express');
var router = express.Router();
let menuSchema = require('../models/menu')

/* GET home page. */router.get('/', async function (req, res, next) {
  try {
    let allMenus = await menuSchema.find().lean(); // Lấy tất cả menu
    let menuMap = {};

    // Tạo map để dễ dàng xây dựng cấu trúc cha-con
    allMenus.forEach(menu => {
      menu.children = [];
      menuMap[menu._id] = menu;
    });

    // Xây dựng cấu trúc cha-con
    let rootMenus = [];
    allMenus.forEach(menu => {
      if (menu.parent) {
        if (menuMap[menu.parent]) {
          menuMap[menu.parent].children.push(menu);
        }
      } else {
        rootMenus.push(menu);
      }
    });

    res.status(200).send(rootMenus);
  } catch (error) {
    next(error);
  }
});router.get('/', async function (req, res, next) {
  try {
    let allMenus = await menuSchema.find().lean(); // Lấy tất cả menu
    let menuMap = {};

    // Tạo map để dễ dàng xây dựng cấu trúc cha-con
    allMenus.forEach(menu => {
      menu.children = [];
      menuMap[menu._id] = menu;
    });

    // Xây dựng cấu trúc cha-con
    let rootMenus = [];
    allMenus.forEach(menu => {
      if (menu.parent) {
        if (menuMap[menu.parent]) {
          menuMap[menu.parent].children.push(menu);
        }
      } else {
        rootMenus.push(menu);
      }
    });

    res.status(200).send(rootMenus);
  } catch (error) {
    next(error);
  }
});


router.post('/', async function (req, res, next) {
  let newObj = {
    text: req.body.text,
    URL: req.body.URL,
  }
  if (req.body.parent) {
    let parent = await menuSchema.findOne({
      text: req.body.parent
    })
    if (parent) {
      newObj.parent = parent._id
    }
  }
  let newMenu = new menuSchema(newObj)
  await newMenu.save();
  res.send(newMenu)
});

module.exports = router;
