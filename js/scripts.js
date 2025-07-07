document.addEventListener('DOMContentLoaded', () => {

  // Отображение шапки

  const header = document.querySelector('.header');
  const headerContainer = document.querySelector('.header-container');
  const headerLogo = document.querySelector('.header-logo');
  const navs = document.querySelectorAll('.header-nav ul li a');
  const navList = document.querySelector('.header-nav ul');
  const headerPhone = document.querySelector('.header-phone');
  const getRequestBtns = document.querySelectorAll('.get-request-btn');
  const headerPhoneMobile = document.querySelector('.header-phone-mobile');

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
    if (!headerContainer.classList.contains('scroll-up')) return;

    resetTimeoutId = setTimeout(() => {
      headerContainer.classList.remove('scroll-up');
      headerLogo.classList.remove('header-logo-scroll-up');
      headerPhone.classList.remove('add-border-scoll-up');
      getRequestBtns.forEach(btn => btn.classList.remove('add-border-scoll-up'));
      headerPhoneMobile.classList.remove('add-border-scoll-up');
      navs.forEach(el => el.classList.remove('header-nav-scroll-up'));
      navList.classList.remove('scroll-up-gap');
      resetTimeoutId = null;
    }, 3000);
  };

  const applyScrollUpStyles = () => {
    
    clearResetTimeout();  
    navList.classList.add('scroll-up-gap');
    headerContainer.classList.add('scroll-up');
    headerLogo.classList.add('header-logo-scroll-up');
    headerPhone.classList.add('add-border-scoll-up');
    getRequestBtns.forEach(btn => btn.classList.add('add-border-scoll-up'));
    headerPhoneMobile.classList.add('add-border-scoll-up');
    navs.forEach(el => el.classList.add('header-nav-scroll-up'));
  };

  const updateHeader = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll === 0) {
      // Не сбрасываем стили если это не главная страница
      if (page === 'main') {
        // на самом верху
        clearResetTimeout();
        headerContainer.classList.remove('scroll-up');
        headerLogo.classList.remove('header-logo-scroll-up');
        headerPhone.classList.remove('add-border-scoll-up');
        getRequestBtns.forEach(btn => btn.classList.remove('add-border-scoll-up'));
        headerPhoneMobile.classList.remove('add-border-scoll-up');
        navs.forEach(el => el.classList.remove('header-nav-scroll-up'));
        navList.classList.remove('scroll-up-gap');
        header.classList.remove('header-hidden');
      };
    } else if (currentScroll > lastScroll) {
      // вниз — скрываем шапку
      header.classList.add('header-hidden');
      resetStyles();
    } else {
      // вверх — показываем шапку с новыми стилями
      applyScrollUpStyles();
      header.classList.remove('header-hidden');
    }

    lastScroll = currentScroll;
    ticking = false;
  };

  // Инициализация при загрузке
  if (lastScroll > 0) {
    header.classList.add('header-hidden');
    applyScrollUpStyles();
  } else {
    // если на верху — сразу сбрасываем без задержки
    clearResetTimeout();

    headerContainer.classList.remove('scroll-up');
    header.classList.remove('header-hidden');

    if (page !== 'main') {
      navList.classList.add('scroll-up-gap');
      headerContainer.classList.add('scroll-up');
      headerLogo.classList.add('header-logo-scroll-up');
      headerPhone.classList.add('add-border-scoll-up');
      getRequestBtns.forEach(btn => btn.classList.add('add-border-scoll-up'));
      headerPhoneMobile.classList.add('add-border-scoll-up');
      navs.forEach(el => el.classList.add('header-nav-scroll-up'));
    }
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
  



  // Бургер меню

  const burger   = document.getElementById('burger');

  if (burger) {
    const sideMenu = document.getElementById('sideMenu');
    const overlay  = document.getElementById('overlay');
    const htmlEl   = document.documentElement;
    const bodyEl   = document.body;

    function openMenu() {
      burger.classList.add('active');
      sideMenu.classList.add('open');
      overlay.classList.add('active');
      htmlEl.classList.add('no-scroll');
      bodyEl.classList.add('no-scroll');
    }

    function closeMenu() {
      burger.classList.remove('active');
      sideMenu.classList.remove('open');
      overlay.classList.remove('active');
      htmlEl.classList.remove('no-scroll');
      bodyEl.classList.remove('no-scroll');
    }

    // клик по бургеру — открываем/закрываем
    burger.addEventListener('click', event => {
      event.stopPropagation(); 
      sideMenu.classList.contains('open') ? closeMenu() : openMenu();
    });

    // клик по оверлею — закрываем меню
    overlay.addEventListener('click', closeMenu);
    }





    // Cookie banner

    const cookieBanner = document.getElementById('cookie-consent-banner');
    
    if (cookieBanner) {
      const button = document.getElementById('cookie-consent-button');
      const consentKey = 'cookieConsent';
      const consentValue = 'accepted';
      const cookieName = 'cookie_consent';

      function hasConsent() {
        if (localStorage.getItem(consentKey) === consentValue) {
          return true;
        }
        const match = document.cookie.match(new RegExp('(?:^|; )' + cookieName + '=([^;]*)'));
        return match && match[1] === consentValue;
      }

      // Сохраняем согласие
      function setConsent() {
        localStorage.setItem(consentKey, consentValue);
        const d = new Date();
        d.setTime(d.getTime() + (365*24*60*60*1000));
        document.cookie = `${cookieName}=${consentValue};expires=${d.toUTCString()};path=/`;
      }

      // Показываем баннер, если нет согласия
      if (!hasConsent()) {
        cookieBanner.classList.remove('hidden');

        button.addEventListener('click', () => {
          setConsent();
          cookieBanner.classList.add('hidden');
        });
      }
    }




    // Swiper карточек
    const tentForTrucksSwiper = document.querySelector('.tents-for-trucks-images');

    if (tentForTrucksSwiper) {
      const swiper = new Swiper(tentForTrucksSwiper, {
        slidesPerView: 4,     
        spaceBetween: 20,      
        centeredSlides: false,     
        grabCursor: false,           
      });
    }
});
