let menuSchema = require('../models/menu');

module.exports = {
  // Lấy danh sách menu theo cấu trúc cha-con
  getMenus: async function () {
    let menus = await menuSchema.find().lean(); // Lấy tất cả menu
    let menuMap = {};

    // Tạo một map để dễ dàng xây dựng cấu trúc cha-con
    menus.forEach(menu => {
      menu.children = [];
      menuMap[menu._id] = menu;
    });

    // Xây dựng cấu trúc cha-con
    let rootMenus = [];
    menus.forEach(menu => {
      if (menu.parent) {
        if (menuMap[menu.parent]) {
          menuMap[menu.parent].children.push(menu);
        }
      } else {
        rootMenus.push(menu);
      }
    });

    return rootMenus;
  },

  // Tạo menu mới
  createMenu: async function (text, url, parent) {
    let newMenu = new menuSchema({
      text: text,
      url: url,
      parent: parent || null // Nếu không có parent, để null
    });
    await newMenu.save();
    return newMenu;
  },

  // Cập nhật menu
  updateMenu: async function (id, text, url, parent) {
    let updatedMenu = await menuSchema.findByIdAndUpdate(
      id,
      { text, url, parent },
      { new: true }
    );
    return updatedMenu;
  },

  // Xóa menu
  deleteMenu: async function (id) {
    await menuSchema.findByIdAndDelete(id);
    return { success: true, message: 'Menu deleted successfully' };
  }
};