
      async function loadLayout() {
        const res = await fetch("layouts.html");
        const layout = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(layout, "text/html");
        document.getElementById("header-container").innerHTML =
          doc.querySelector("header").outerHTML;
        document.getElementById("footer-container").innerHTML =
          doc.querySelector("footer").outerHTML;
      }
      loadLayout();
