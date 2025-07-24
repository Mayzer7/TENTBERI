// Отображение шапки

const header = document.querySelector(".header");
const headerContainer = document.querySelector(".header-container");
const headerLogo = document.querySelector(".header-logo");
const navs = document.querySelectorAll(".header-nav ul li a");
const navList = document.querySelector(".header-nav ul");
const headerPhone = document.querySelector(".header-phone");
const getRequestBtns = document.querySelectorAll(".get-request-btn");
const headerPhoneMobile = document.querySelector(".header-phone-mobile");
const htmlEl = document.documentElement;
const bodyEl = document.body;
const overlay = document.getElementById("overlay");

// Сбрасываем стили шапки сверху экрана только на главной странице
const page = document.body.dataset.page;

let lastScroll = window.pageYOffset;
let ticking = false;
let resetTimeoutId = null;

const clearResetTimeout = () => {
  if (resetTimeoutId) {
    clearTimeout(resetTimeoutId);
    resetTimeoutId = null;
  }
};

const resetStyles = () => {
  clearResetTimeout();
  // только если нет активно scroll-up
  if (!headerContainer.classList.contains("scroll-up")) return;

  resetTimeoutId = setTimeout(() => {
    headerContainer.classList.remove("scroll-up");
    headerLogo.classList.remove("header-logo-scroll-up");
    headerPhone.classList.remove("add-border-scoll-up");
    getRequestBtns.forEach((btn) =>
      btn.classList.remove("add-border-scoll-up")
    );
    headerPhoneMobile.classList.remove("add-border-scoll-up");
    navs.forEach((el) => el.classList.remove("header-nav-scroll-up"));
    navList.classList.remove("scroll-up-gap");
    resetTimeoutId = null;
  }, 3000);
};

const applyScrollUpStyles = () => {
  clearResetTimeout();
  navList.classList.add("scroll-up-gap");
  headerContainer.classList.add("scroll-up");
  headerLogo.classList.add("header-logo-scroll-up");
  headerPhone.classList.add("add-border-scoll-up");
  getRequestBtns.forEach((btn) => btn.classList.add("add-border-scoll-up"));
  headerPhoneMobile.classList.add("add-border-scoll-up");
  navs.forEach((el) => el.classList.add("header-nav-scroll-up"));
};

const updateHeader = () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll === 0) {
    // Не сбрасываем стили если это не главная страница
    if (page === "main") {
      // на самом верху
      clearResetTimeout();
      headerContainer.classList.remove("scroll-up");
      headerLogo.classList.remove("header-logo-scroll-up");
      headerPhone.classList.remove("add-border-scoll-up");
      getRequestBtns.forEach((btn) =>
        btn.classList.remove("add-border-scoll-up")
      );
      headerPhoneMobile.classList.remove("add-border-scoll-up");
      navs.forEach((el) => el.classList.remove("header-nav-scroll-up"));
      navList.classList.remove("scroll-up-gap");
      header.classList.remove("header-hidden");
    }
  } else if (currentScroll > lastScroll) {
    // вниз — скрываем шапку
    header.classList.add("header-hidden");
    resetStyles();
  } else {
    // вверх — показываем шапку с новыми стилями
    applyScrollUpStyles();
    header.classList.remove("header-hidden");
  }

  lastScroll = currentScroll;
  ticking = false;
};

// Инициализация при загрузке
if (lastScroll > 0) {
  header.classList.add("header-hidden");
  applyScrollUpStyles();
} else {
  // если на верху — сразу сбрасываем без задержки
  clearResetTimeout();

  headerContainer.classList.remove("scroll-up");
  header.classList.remove("header-hidden");

  if (page !== "main") {
    navList.classList.add("scroll-up-gap");
    headerContainer.classList.add("scroll-up");
    headerLogo.classList.add("header-logo-scroll-up");
    headerPhone.classList.add("add-border-scoll-up");
    getRequestBtns.forEach((btn) => btn.classList.add("add-border-scoll-up"));
    headerPhoneMobile.classList.add("add-border-scoll-up");
    navs.forEach((el) => el.classList.add("header-nav-scroll-up"));
  }
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  },
  { passive: true }
);

// Бургер меню

const burger = document.getElementById("burger");

if (burger) {
  const sideMenu = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");

  function openMenu() {
    burger.classList.add("active");
    sideMenu.classList.add("open");
    overlay.classList.add("active", "dim");
    htmlEl.classList.add("no-scroll");
    bodyEl.classList.add("no-scroll");
  }

  function closeMenu() {
    burger.classList.remove("active");
    sideMenu.classList.remove("open");
    overlay.classList.remove("active", "dim");
    htmlEl.classList.remove("no-scroll");
    bodyEl.classList.remove("no-scroll");
  }

  // клик по бургеру — открываем/закрываем
  burger.addEventListener("click", (event) => {
    event.stopPropagation();
    sideMenu.classList.contains("open") ? closeMenu() : openMenu();
  });

  // клик по оверлею — закрываем меню
  overlay.addEventListener("click", closeMenu);
}

// Cookie banner

const cookieBanner = document.getElementById("cookie-consent-banner");

if (cookieBanner) {
  const button = document.getElementById("cookie-consent-button");
  const consentKey = "cookieConsent";
  const consentValue = "accepted";
  const cookieName = "cookie_consent";

  function hasConsent() {
    if (localStorage.getItem(consentKey) === consentValue) {
      return true;
    }
    const match = document.cookie.match(
      new RegExp("(?:^|; )" + cookieName + "=([^;]*)")
    );
    return match && match[1] === consentValue;
  }

  // Сохраняем согласие
  function setConsent() {
    localStorage.setItem(consentKey, consentValue);
    const d = new Date();
    d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = `${cookieName}=${consentValue};expires=${d.toUTCString()};path=/`;
  }

  // Показываем баннер, если нет согласия
  if (!hasConsent()) {
    cookieBanner.classList.remove("hidden");

    button.addEventListener("click", () => {
      setConsent();
      cookieBanner.classList.add("hidden");
    });
  }
}

// Swiper карточек
const tentForTrucksSwiper = document.querySelector(".tents-for-trucks-images");

if (tentForTrucksSwiper) {
  const swiper = new Swiper(tentForTrucksSwiper, {
    slidesPerView: 4,
    slidesPierGroup: 1,
    spaceBetween: 20,
    centeredSlides: false,
    grabCursor: false,

    breakpoints: {
      1200: {
        slidesPerView: 4,
      },
      1000: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
      900: {
        slidesPerView: 3.1,
        spaceBetween: 12,
      },
      700: {
        slidesPerView: 2.5,
        spaceBetween: 12,
      },
      601: {
        slidesPerView: 2.2,
        spaceBetween: 12,
      },
      300: {
        slidesPerView: 1.3,
        spaceBetween: 12,
      },
    },
  });
}

// Модальное окно для просмотра изображений на странице "tents-for-trucks.html"

const modalGallery = document.querySelector(".modal-gallery");

if (modalGallery) {
  const modal = document.getElementById("modalGallery");

  const mainWrapper = modal.querySelector(".modal-swiper .swiper-wrapper");
  const thumbsWrapper = modal.querySelector(".modal-thumbs .swiper-wrapper");

  // Клонируем изображения в оба контейнера
  document
    .querySelectorAll(".tents-for-trucks-images .swiper-slide img")
    .forEach((img, idx) => {
      const src = img.getAttribute("src") || img.dataset.src;
      const alt = img.alt || "";

      // Большой слайд
      const bigSlide = document.createElement("div");
      bigSlide.classList.add("swiper-slide");
      const bigImg = new Image();
      bigImg.src = src;
      bigImg.alt = alt;
      bigSlide.appendChild(bigImg);
      mainWrapper.appendChild(bigSlide);

      // Слайд для миниатюры
      const thumbSlide = document.createElement("div");
      thumbSlide.classList.add("swiper-slide");
      const thumbImg = new Image();
      thumbImg.src = src;
      thumbImg.alt = alt;
      thumbSlide.appendChild(thumbImg);
      thumbsWrapper.appendChild(thumbSlide);
    });

  // Центрируем миниатюры если их мало
  function checkCentered(thumbsWrapper) {
    const thumbCount = thumbsWrapper.children.length;

    thumbsWrapper.classList.remove(
      "uncentered4",
      "uncentered5",
      "uncentered6",
      "uncentered7"
    );

    if (thumbCount >= 4 && thumbCount <= 7) {
      thumbsWrapper.classList.add(`uncentered${thumbCount}`);
    }

    thumbsWrapper.classList.toggle("centered", thumbCount < 8);
  }

  checkCentered(thumbsWrapper);

  // Инициализируем Swiper для миниатюр
  const thumbsSwiper = new Swiper(".modal-thumbs", {
    spaceBetween: 20,
    slidesPerView: 9,
    slidesPerGroup: 1,
    freeMode: false,
    watchSlidesProgress: true,
    breakpoints: {
      1800: {
        slidesPerView: 8,
      },
      1501: {
        slidesPerView: 7.5,
      },
      1151: {
        slidesPerView: 6.5,
      },
      801: {
        slidesPerView: 5.5,
        spaceBetween: 12,
      },
      601: {
        slidesPerView: 4.5,
        spaceBetween: 12,
      },
      0: {
        slidesPerView: 3.3,
        spaceBetween: 12,
      },
    },
  });

  // Инициализируем основной Swiper и подключаем thumbs-модуль
  const modalSwiper = new Swiper(".modal-swiper", {
    loop: true,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 0,
    zoom: { maxRatio: 2 },
    navigation: {
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    },
    thumbs: {
      swiper: thumbsSwiper,
    },
  });

  // Открытие модального окна по клику на исходную миниатюру
  document
    .querySelectorAll(".tents-for-trucks-images .swiper-slide img")
    .forEach((img, idx) => {
      img.addEventListener("click", () => {
        modal.classList.add("open");
        modalSwiper.slideToLoop(idx, 0);
        document.documentElement.classList.add("no-scroll");
        document.body.classList.add("no-scroll");
      });
    });

  // Кнопка закрытия
  modal.querySelector("#modalClose").addEventListener("click", () => {
    modal.classList.remove("open");
    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");
  });
}

// Кнопка "Читать ещё" на странице "tents-for-trucks.html"

const readMoreButton = document.querySelector(".read-more-btn");

if (readMoreButton) {
  const btn = document.querySelector(".read-more-btn");

  btn.addEventListener("click", () => {
    const container = btn.closest(".production-texts");
    const rightCol = container.querySelector(".production-right-text");

    if (!container.classList.contains("expanded")) {
      const fullHeight = rightCol.scrollHeight + 10;

      rightCol.style.maxHeight = fullHeight + "px";
      container.classList.add("expanded");
      btn.textContent = "скрыть";
    } else {
      rightCol.style.maxHeight = "";
      container.classList.remove("expanded");
      btn.textContent = "читать ещё";
    }
  });
}

// Скелетон анимация для ожидания подгрузки изображений

function initSkeleton(root = document) {
  const images = Array.from(root.querySelectorAll(".skeleton img"));
  images.forEach((img) => {
    const wrapper = img.closest(".skeleton");
    const realSrc = img.dataset.src;
    if (!realSrc || img._skeletonBound) return;

    img._skeletonBound = true;
    img.style.opacity = "0";
    img.src = realSrc;
    img.addEventListener("load", function onLoad() {
      img.removeEventListener("load", onLoad);
      img.style.transition = "opacity 0.3s ease";
      img.style.opacity = "1";
      wrapper.classList.remove("skeleton");
    });
  });
}

initSkeleton();

// Форматирование номера телефона для модалки "Оставить заявку"
function initPhoneFormatter(selector) {
  const phoneInput = document.querySelector(selector);
  if (!phoneInput) return;

  phoneInput.addEventListener("input", (e) => {
    let value = phoneInput.value.replace(/\D/g, "");

    if (e.inputType === "deleteContentBackward" && value.length <= 1) {
      phoneInput.value = "";
      return;
    }

    let prefix = "";
    if (value.startsWith("8")) {
      prefix = "8 ";
      value = value.slice(1);
    } else if (value.startsWith("7")) {
      prefix = "+7 ";
      value = value.slice(1);
    }

    value = value.slice(0, 10);

    let formatted = "";
    if (value.length > 0) formatted += `(${value.slice(0, 3)}`;
    if (value.length >= 4) formatted += `) ${value.slice(3, 6)}`;
    if (value.length >= 7) formatted += `-${value.slice(6, 8)}`;
    if (value.length >= 9) formatted += `-${value.slice(8, 10)}`;

    const cursorPos = phoneInput.selectionStart;
    const oldLen = phoneInput.value.length;

    phoneInput.value = prefix + formatted;

    const newLen = phoneInput.value.length;
    phoneInput.setSelectionRange(
      cursorPos + (newLen - oldLen),
      cursorPos + (newLen - oldLen)
    );
  });

  phoneInput.isValidPhone = function () {
    const digits = phoneInput.value.replace(/\D/g, "");
    return digits.startsWith("7") || digits.startsWith("8")
      ? digits.length >= 11
      : digits.length >= 10;
  };
}

initPhoneFormatter('.get-request-form input[name="phone"]');

/* Модальное окно "Оставить заявку" */

const getRequestModal = document.querySelector(".get-request-modal");
const successModal = document.getElementById("success-modal");
const errorModal = document.getElementById("error-modal");

function openModalContact(modalEl) {
  header.classList.add("header-hidden");
  modalEl.classList.add("active");
  overlay.classList.add("active", "dim");
  htmlEl.classList.add("no-scroll");
  bodyEl.classList.add("no-scroll");
}

function closeModalContact(modalEl) {
  header.classList.remove("header-hidden");
  modalEl.classList.remove("active");
  overlay.classList.remove("active", "dim");
  htmlEl.classList.remove("no-scroll");
  bodyEl.classList.remove("no-scroll");
}

// openSuccessMod
function openSuccessMod() {
  openModalContact(successModal);
}

// openErrorMod
function openErrorMod() {
  openModalContact(errorModal);
}

// formReset
function formReset(formEl) {
  // Сброс полей формы
  formEl.reset();

  // Удаление классов ошибок
  formEl.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
  formEl.querySelectorAll('.checkbox-error-message.visible').forEach(el => el.classList.remove('visible'));
}

if (getRequestModal) {
  // Окна
  const modal = document.getElementById("get-request-modal");
  const successModal = document.getElementById("success-modal");
  const errorModal = document.getElementById("error-modal");

  // Открытие модального окна при переходе по ссылке в footer
  const openModalLink = document.getElementById("open-modal-link");

  // Кнопки закрытия
  const closeBtn = document.getElementById("closeModal");
  const closeSuccessBtn = document.getElementById("closeSuccessModal");
  const tryAgainModal = document.getElementById("try-again-modal");

  document.querySelectorAll(".sign-up-button").forEach((btn) => {
    btn.addEventListener("click", () => openModalContact(modal));
  });

  // Закрыть крестиком
  closeBtn.addEventListener("click", () => closeModalContact(modal));
  closeSuccessBtn.addEventListener("click", () => {
    closeModalContact(modal);
    closeModalContact(successModal);
  });

  if (openModalLink) {
    openModalLink.addEventListener("click", () => {
      openModalContact(modal);
    });
  }

  tryAgainModal.addEventListener("click", () => {
    closeModalContact(errorModal);
    openModalContact(modal);
  });

  overlay.addEventListener("click", () => {
    closeModalContact(modal);
    closeModalContact(successModal);
    closeModalContact(errorModal);
  });

  // Валидация
  const form = document.querySelector(".get-request-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    // Проверяем обязательные поля
    this.querySelectorAll('.modal__input[placeholder*="*"]').forEach((inp) => {
      if (!inp.value.trim()) {
        valid = false;
        inp.classList.add("invalid");
      } else {
        inp.classList.remove("invalid");
      }
    });

    // Валидация телефона
    const phoneInput = this.querySelector('input[name="phone"]');
    const rawDigits = phoneInput.value.replace(/\D/g, "");

    // Показываем ошибку только если пользователь начал вводить номер
    if (rawDigits.length > 0) {
      if (!phoneInput.isValidPhone()) {
        valid = false;
        phoneInput.classList.add("invalid");

        if (!this.querySelector(".phone-error-message")) {
          const msg = document.createElement("div");
          msg.className = "phone-error-message";
          msg.textContent = "Введите корректный номер телефона";
          phoneInput.after(msg);
          requestAnimationFrame(() => {
            msg.classList.add("visible");
          });
        }
      } else {
        phoneInput.classList.remove("invalid");
        const oldMsg = this.querySelector(".phone-error-message");
        if (oldMsg) oldMsg.remove();
      }
    }

    // Проверка чекбокса Политики
    const checkbox = this.querySelector("#accept-politics");
    const errorMsg = this.querySelector(".checkbox-error-message");
    if (!checkbox.checked) {
      valid = false;
      checkbox.classList.add("invalid");
      errorMsg.classList.add("visible");
    } else {
      checkbox.classList.remove("invalid");
      errorMsg.classList.remove("visible");
    }

    // Убираем ошибку по клику
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        checkbox.classList.remove("invalid");
        errorMsg.classList.remove("visible");
      }
    });

    if (!valid) return;

    const data = {};
    new FormData(this).forEach((val, key) => (data[key] = val));
    console.log("Заявка:", data);

    // Закрываем модалку заявки и открываем модалку успеха
    closeModalContact(modal);
    openModalContact(successModal);

    // Очищаем форму после успешной отправки
    formReset(this);
  });
}

// Тултип с разъеснением в модальном окне "Оставить заявку"
function initTooltip() {
  let currentTooltip = null;
  let currentBtn = null;

  function removeTooltip() {
    if (currentTooltip) {
      currentTooltip.remove();
      currentTooltip = null;
    }
    if (currentBtn) {
      currentBtn.classList.remove("active");
      currentBtn = null;
    }
  }

  document.querySelectorAll(".tooltip-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      removeTooltip();

      btn.classList.add("active");
      currentBtn = btn;

      const container = btn.closest(".tooltip-container");
      const text = container.dataset.tooltip;
      if (!text) return;

      const tip = document.createElement("div");
      tip.className = "tooltip-modal-body";

      const svgIcon = `
            <svg class="tooltip-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9H12.01M11 12H12V16H13M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12Z" stroke="#2F5CB7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `;

      const closeTooltipBtn = `
            <svg class="close-tooltip-btn" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.7075 5.69596L13.416 11.9926L19.7075 18.2893C19.895 18.4772 20.0002 18.7319 20 18.9975C19.9998 19.2631 19.8942 19.5177 19.7065 19.7053C19.6135 19.7982 19.5032 19.8719 19.3817 19.9221C19.2603 19.9724 19.1302 19.9982 18.9988 19.9981C18.7335 19.9979 18.4791 19.8922 18.2916 19.7043L12.0001 13.4077L5.70864 19.7043C5.61603 19.798 5.50578 19.8724 5.38426 19.9231C5.26274 19.9739 5.13238 20 5.0007 20C4.86903 20 4.73866 19.9739 4.61715 19.9231C4.49563 19.8724 4.38537 19.798 4.29276 19.7043C4.10531 19.5166 4 19.2622 4 18.9968C4 18.7314 4.10531 18.4769 4.29276 18.2893L10.5842 11.9926L4.29276 5.69596C4.11062 5.50722 4.00983 5.25443 4.01211 4.99204C4.01439 4.72965 4.11955 4.47865 4.30494 4.29311C4.49034 4.10756 4.74113 4.00232 5.0033 4.00004C5.26548 3.99776 5.51806 4.09863 5.70664 4.28092L11.9981 10.5776L18.2896 4.28092C18.4782 4.09863 18.7308 3.99776 18.9929 4.00004C19.2551 4.00232 19.5059 4.10756 19.6913 4.29311C19.8767 4.47865 19.9818 4.72965 19.9841 4.99204C19.9864 5.25443 19.8856 5.50722 19.7035 5.69596H19.7075Z" fill="#8A93A6"/>
            </svg>
          `;

      // собираем HTML тултипа: сначала SVG, потом текст и кнопку закрытия на мобилке
      tip.innerHTML =
        svgIcon + `<span class="tooltip-text">${text}</span>` + closeTooltipBtn;

      document.body.append(tip);
      currentTooltip = tip;

      // получаем размеры и позицию кнопки

      // Если мобилка тултип прижат вниз экрана
      if (window.innerWidth <= 740) {
        requestAnimationFrame(() => tip.classList.add("show"));
        return;
      }

      // Если декстоп, то около кнопки
      const rect = btn.getBoundingClientRect();
      const scrollX = window.scrollX,
        scrollY = window.scrollY;
      let left = scrollX + rect.left + rect.width / 2;
      let top = scrollY + rect.bottom + 8;
      document.body.append(tip);
      const tipWidth = tip.offsetWidth;
      const vpWidth = document.documentElement.clientWidth;
      const minLeft = scrollX + 8 + tipWidth / 2;
      const maxLeft = scrollX + vpWidth - 8 - tipWidth / 2;
      left = Math.min(Math.max(left, minLeft), maxLeft);

      tip.style.top = `${top}px`;
      tip.style.left = `${left}px`;
      tip.style.transform = "translateX(-50%)";

      requestAnimationFrame(() => tip.classList.add("show"));
    });
  });

  document.addEventListener("click", removeTooltip);
  window.addEventListener("resize", removeTooltip);
  window.addEventListener("scroll", removeTooltip);
}

// Вызываем тултип
initTooltip();

// Страница FAQ

// Раскрытие менюшек
const faq = document.querySelector(".faq");

if (faq) {
  document.querySelectorAll(".faq-card").forEach((card) => {
    const bottom = card.querySelector(".faq-card-bottom");

    card.addEventListener("click", () => {
      card.classList.toggle("open");
      if (card.classList.contains("open")) {
        bottom.style.maxHeight = bottom.scrollHeight + 10 + "px";
      } else {
        bottom.style.maxHeight = null;
      }
    });
  });

  window.addEventListener("resize", () => {
    document
      .querySelectorAll(".faq-card.open .faq-card-bottom")
      .forEach((bottom) => {
        bottom.style.maxHeight = bottom.scrollHeight + 10 + "px";
      });
  });
}

// Яндекс карта

const maps = document.querySelector(".maps");

if (maps) {
  let center = [56.33141300423818, 43.868606999999955];

  function createMap(mapId) {
    let map = new ymaps.Map(mapId, {
      center: center,
      zoom: 15.5,
    });

    let placemark = new ymaps.Placemark(
      center,
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "/img/svg/marker.svg",
        iconImageSize: [40, 40],
        iconImageOffset: [-19, -44],
      }
    );

    placemark.events.add("click", function () {
      // Переход по ссылке адреса компании
      const url =
        "https://yandex.ru/maps/geo/ulitsa_krasnykh_zor_22_podyezd_4/2028698096/?ll=43.868635%2C56.331386&z=18.93";
      window.open(url, "_blank");
    });

    map.controls.remove("geolocationControl"); // удаляем геолокацию
    map.controls.remove("searchControl"); // удаляем поиск
    map.controls.remove("trafficControl"); // удаляем контроль трафика
    map.controls.remove("typeSelector"); // удаляем тип
    map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove("zoomControl"); // удаляем контрол зуммирования
    map.controls.remove("rulerControl"); // удаляем контрол правил

    map.geoObjects.add(placemark); // добавляем метку на карту
  }

  ymaps.ready(() => {
    if (maps) {
      createMap("map");
    }
  });
}

// Модальное окно для просмотра фоток в секции "ТентБери в деле"

const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const modalCaseName = document.getElementById("modal-case-name");
const imgWrapper = modal.querySelector(".modal-img-wrapper");
const closeBtn = modal.querySelector(".modal-close-button");
let zoomed = false;

function openModalImage(imgSrc, title) {
  modalImg.src = imgSrc;
  modalCaseName.textContent = title;
  zoomed = false;
  imgWrapper.classList.remove("zoomed");
  modalImg.style.transformOrigin = "center center";
  modalImg.style.transform = "scale(1)";

  modal.classList.add("visible");
  htmlEl.classList.add("no-scroll");
  bodyEl.classList.add("no-scroll");
  header.classList.add("header-hidden");
}

function closeModalImage() {
  modal.classList.remove("visible");
  htmlEl.classList.remove("no-scroll");
  bodyEl.classList.remove("no-scroll");
}

const imageModal = document.querySelector(".image-modal");

if (imageModal) {
  // привязываем к каждому изображению и передаём title
  // способ через родителя (ajax должен работать)
  const casesContainer = document.querySelector(".tentberi-cases");
  casesContainer.addEventListener("click", (e) => {
    const img = e.target.closest(".tenberi-case-image img");
    if (!img) return;

    const caseEl = img.closest(".tentberi-case");
    const title = caseEl
      .querySelector(".tentberi-case-name")
      .textContent.trim();
    const src = img.dataset.src || img.src;

    openModalImage(src, title);
  });

  // Зум по клику
  imgWrapper.addEventListener("click", (e) => {
    const rect = modalImg.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const px = (offsetX / rect.width) * 100;
    const py = (offsetY / rect.height) * 100;

    if (!zoomed) {
      modalImg.style.transformOrigin = `${px}% ${py}%`;
      modalImg.style.transform = "scale(2)";
      imgWrapper.classList.add("zoomed");
      zoomed = true;
    } else {
      modalImg.style.transform = "scale(1)";
      const onEnd = () => {
        modalImg.style.transformOrigin = "center center";
        imgWrapper.classList.remove("zoomed");
        modalImg.removeEventListener("transitionend", onEnd);
      };
      modalImg.addEventListener("transitionend", onEnd);
      zoomed = false;
    }
  });

  // Закрытие модалки
  closeBtn.addEventListener("click", closeModalImage);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalImage();
    }
  });
}

// Подстветка поля Cookies в политике конфиденциальности

if (location.hash === "#cookies") {
  const el = document.getElementById("cookies");
  if (el) {
    const yOffset = -20;
    const yPos = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: yPos, behavior: "smooth" });

    setTimeout(() => {
      el.classList.add("highlighted");
    }, 500);

    setTimeout(() => {
      el.classList.remove("highlighted");
    }, 3000);
  }
}

// Фиксирование кнопки "Оставить заявку" на странице "tents-for-trucks.html"
const needConsultation = document.querySelector(".need-consultation");

if (needConsultation) {
  const section = document.querySelector(".need-consultation-content");
  const button = document.querySelector(".sign-up-button");

  function onScroll() {
    const rect = section.getBoundingClientRect();
    const btnH = button.offsetHeight;
    const vh = window.innerHeight;

    // Перед секцией "Нужна консультация" кнопка фиксируется на экарне
    if (rect.top > vh - btnH - 20) {
      button.classList.add("fixed");
      button.classList.remove("sticky");
    }
    // Внутри секции "Нужна консультация" оставляем кнопку на месте
    else if (rect.bottom > btnH + 20) {
      button.classList.remove("fixed");
      button.classList.add("sticky");
    }
    // После секции ""Нужна консультация"" кнопка не фиксируется, пропадает
    else {
      button.classList.remove("fixed");
      button.classList.remove("sticky");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
