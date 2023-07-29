// достаем наши элементы с помощью селекторов из html
let menu = document.querySelector(".menu"),
    toggle = document.querySelector(".menu-toggle"),
    content = document.querySelector(".menu-content");

// создаем функцию для переключения видимости меню
function toggleMenu() {
    toggle.classList.toggle("menu-open");
    // проверяем на наличие класса hidden у меню
    if (document.querySelector(".hidden")) {
        menu.classList.toggle("active");
        setTimeout(() => {
            content.classList.toggle("hidden");
        }, 500);
        setTimeout(() => {
            content.classList.toggle("anim-opacity");
        }, 600);
    } else {
        content.classList.toggle("anim-opacity");
        setTimeout(() => {
            content.classList.toggle("hidden");
            menu.classList.toggle("active");
        }, 300);
    }
}

// назначаем листенер для кнопки, которая будет отвечать за вкл\выкл меню
toggle.addEventListener("click", toggleMenu, false);
