document.addEventListener("DOMContentLoaded", () => {
    const excelButton = document.getElementById("excelButton");
    const mongoButton = document.getElementById("mongoButton");
    const mariaButton = document.getElementById("mariaButton");
    const sidebarMenu = document.getElementById("sidebarMenu");
  
    const menuOptions = {
      excel: [
        { text: "Normal SMS", href: "/normal_sms" },
        { text: "Excel SMS", href: "/excel" },
        { text: "Advanced SMS", href: "/advanced" },
      ],
      mongo: [
        { text: "Normal Mongo SMS", href: "/normal_mongo" },
        { text: "Mongo Column SMS", href: "/mongo_column" },
        { text: "Mongo Advanced SMS", href: "/mongo_advanced" },
      ],
      maria: [
        { text: "Normal Maria SMS", href: "/normal_maria" },
        { text: "Maria Column SMS", href: "/maria_column" },
        { text: "Maria Advanced SMS", href: "/maria_advanced" },
      ],
    };
  
    function updateSidebar(menuType) {
      sidebarMenu.innerHTML = "";
      menuOptions[menuType].forEach((option) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = option.text;
        a.href = option.href;
        li.appendChild(a);
        sidebarMenu.appendChild(li);
      });
  
      // Append static options
      ["contacts", "profile", "settings"].forEach((staticItem) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent =
          staticItem.charAt(0).toUpperCase() + staticItem.slice(1).replace("_", " ");
        a.href = `/${staticItem}`;
        li.appendChild(a);
        sidebarMenu.appendChild(li);
      });
    }
  
    excelButton.addEventListener("click", () => updateSidebar("excel"));
    mongoButton.addEventListener("click", () => updateSidebar("mongo"));
    mariaButton.addEventListener("click", () => updateSidebar("maria"));
  });
  