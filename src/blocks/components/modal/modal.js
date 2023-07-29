const modalTrigger = document.getElementsByClassName("create");
const modalBackground = document.getElementsByClassName("modalBackground")[0];

// перебираем все найденные modalTrigger и на каждый назначаем ивент
for (let i = 0; i < modalTrigger.length; ++i) {
    modalTrigger[i].addEventListener("click", function () {
        modalBackground.style.display = "block";
    });
}

modalBackground.addEventListener("click", function (event) {
    if (event.target === modalBackground) {
        modalBackground.style.display = "none";
    }
});
