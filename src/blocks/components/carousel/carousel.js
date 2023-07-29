// создаем шаблонный компонент для нашей карусели
const TEMPLATE = `
  <div class="b-carousel__item">
    <div class="carousel-inner">
      <div class="card">
        <img src="img/carouselImg-mobile.png" class="carousel-img-mobile" alt="img1">
          <div class="img-triangle-block">
            <div class="triangle">
            </div>
            <img src="img/carouselImg-desktop.png" class="carousel-img-desktop" alt="img1">
          </div>
          <div class="card-body">
            <h2>
              Check-UP
              <span>для мужчин</span>
            </h2>
            <ul>
              <li><span>Гормональный скрининг</span></li>
              <li><span>Тестостерон</span></li>
              <li><span>Свободный тестостерон</span></li>
              <li><span>Глобулин, связывающий половые гормоны</span></li>
            </ul>
            <div class="carousel__price">
              Всего 2800₽
              <span>3500₽</span>
            </div>
            <div class="btn-block">
              <button class="button create">Записаться</button>
              <button class="button btn-secondary">Подробнее</button>
            </div>
          </div>
      </div>
    </div>
  </div>
`;

// функция для получения данных от пхп (в случае проблемы, возвращает наш шаблон)
function getPHPData() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      return this.responseText;
    }
  };
  xhr.open("GET", "query/get-data.php", true);
  xhr.send();
  return TEMPLATE;
}

// функция вызывается в переменную, в которую записывается шаблон
const ITEM = getPHPData();

function Carousel(setting) {
  let privates = {};
  // назначаем в объект privates значение setting, в которое передаем полученные из аргумента значения
  privates.setting = setting;
  // записываем в объект элементы, найденные по селектору в html
  privates.selection = {
    "main": document.querySelector(privates.setting.main),
    "wrap": document.querySelector(privates.setting.wrap),
    "children": document.querySelector(privates.setting.wrap).children,
    "prev": document.querySelector(privates.setting.prev),
    "next": document.querySelector(privates.setting.next),
    "counter": document.querySelector(privates.setting.counter),
  };
  // при помощи innerHTML, записываем в wrap наш массив айтемов
  privates.selection.wrap.innerHTML = [1, 2, 3, 4].map(_ => ITEM);
  privates.opt = {
    "position": 0,
    "max_position": document.querySelector(privates.setting.wrap).children.length
  };
  // проверка на наличие кнопки назад и назначение ей ивента
  if (privates.selection.prev !== null) {
    privates.selection.prev.addEventListener("click", () => {
      this.prev_slide();
    });
  }
  // проверка на наличие кнопки вперед и назначение ей ивента
  if (privates.selection.next !== null) {
    privates.selection.next.addEventListener("click", () => {
      this.next_slide();
    });
  }
  // функция на переключение слайда назад
  this.prev_slide = () => {
    --privates.opt.position;
    if (privates.opt.position < 0) {
      privates.selection.wrap.classList.add("s-notransition");
      privates.opt.position = privates.opt.max_position - 1;
    }
    // записываем текущий слайд в счетчик
    privates.selection.counter.innerHTML = `${privates.opt.position + 1}/4`;
    // переключаем положение слайда при помощи css свойства
    privates.selection.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
  };
  // функция на переключение слайда вперед
  this.next_slide = () => {
    ++privates.opt.position;
    if (privates.opt.position >= privates.opt.max_position) {
      privates.opt.position = 0;
    }
    privates.selection.counter.innerHTML = `${privates.opt.position + 1}/4`;
    privates.selection.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
  };
}

// вызываем нашу функцию Карусель, в которую аргументом передаем объект с необходимыми классами из html
new Carousel({
  "main": ".js-carousel",
  "wrap": ".js-carousel__wrap",
  "prev": ".js-carousel__prev",
  "next": ".js-carousel__next",
  "counter": ".js-carousel__counter"
});
