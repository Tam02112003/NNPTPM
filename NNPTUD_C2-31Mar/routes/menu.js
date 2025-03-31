var express = require('express');
var router = express.Router();
let menuController = require('../controllers/menu');

// Lấy danh sách menu theo cấu trúc cha-con
router.get('/', async function (req, res, next) {
  try {
    let menus = await menuController.getMenus();
    res.status(200).send({
      success: true,
      data: menus
    });
  } catch (error) {
    next(error);
  }
});

// Tạo menu mới
router.post('/', async function (req, res, next) {
  try {
    let { text, url, parent } = req.body;
    let newMenu = await menuController.createMenu(text, url, parent);
    res.status(201).send({
      success: true,
      data: newMenu
    });
  } catch (error) {
    next(error);
  }
});

// Cập nhật menu
router.put('/:id', async function (req, res, next) {
  try {
    let { text, url, parent } = req.body;
    let updatedMenu = await menuController.updateMenu(req.params.id, text, url, parent);
    res.status(200).send({
      success: true,
      data: updatedMenu
    });
  } catch (error) {
    next(error);
  }
});

// Xóa menu
router.delete('/:id', async function (req, res, next) {
  try {
    let result = await menuController.deleteMenu(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

//Get menu home page //
router.get('/', async function (req, res, next) {
  
    let allmenu = await menuController.find();
    let menuLv1 = allmenu.filter(function (e) {
        return e.parent == null
    }
    res.status(200).send({
      success: true,
      data: allmenu
 
});

//Get menu children //
router.get('/children/:id', async function (req, res, next) {
  try {
    let menus = await menuController.getMenusChildren(req.params.id);
    res.status(200).send({
      success: true,
      data: menus
    });
  } catch (error) {
    next(error);
  }
});