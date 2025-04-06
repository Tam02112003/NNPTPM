async function fetchMenu() {
    try {
      let response = await fetch('http://localhost:3000/menus');
      let menuData = await response.json();
      renderMenu(menuData);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  }
  
  function renderMenu(menuData, parentElement = document.getElementById('menu-container')) {
    menuData.forEach(menuItem => {
      // Tạo thẻ <li> cho menu hiện tại
      let li = document.createElement('li');
      let link = document.createElement('a');
      link.href = menuItem.URL;
      link.textContent = menuItem.text;
      li.appendChild(link);
  
      // Thêm menu hiện tại vào phần tử cha
      parentElement.appendChild(li);
  
      // Nếu menu có children, tạo <ul> lồng bên trong
      if (menuItem.children && menuItem.children.length > 0) {
        let ul = document.createElement('ul');
        li.appendChild(ul);
        renderMenu(menuItem.children, ul); // Gọi đệ quy để hiển thị các mục con
      }
    });
  }
  
  // Gọi hàm fetchMenu khi trang được tải
  fetchMenu();