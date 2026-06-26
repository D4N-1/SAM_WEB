const sideMenuBtn = document.getElementById("sideMenuBtn")
const sideMenu = document.getElementById("sideMenu")
sideMenuBtn.addEventListener("click", (e) => {
    const status = sideMenuBtn.dataset.status
    if (status == "off") {
        sideMenu.style.opacity = "1"
        sideMenu.style.pointerEvents = "auto";
        sideMenuBtn.dataset.status = "on"
        sideMenuBtn.style.backgroundColor = "#ddd"
        document.body.classList.add("side-menu__active")
    }
    
    else {
        sideMenu.style.opacity = "0"
        sideMenu.style.pointerEvents = "none";
        sideMenuBtn.dataset.status = "off"
        sideMenuBtn.style.backgroundColor = ""
        document.body.classList.remove("side-menu__active")
    }
})