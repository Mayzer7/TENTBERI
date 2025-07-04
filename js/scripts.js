document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const headerContainer = document.querySelector('.header-container');
  const headerLogo = document.querySelector('.header-logo');
  const navs = document.querySelectorAll('.header-nav ul li a');
  const navList = document.querySelector('.header-nav ul');
  const headerPhone = document.querySelector('.header-phone');
  const getRequestBtns = document.querySelectorAll('.get-request-btn');

  let lastScroll = window.pageYOffset;
  let ticking = false;
  let resetTimeoutId = null;  // для хранения таймаута

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
    navs.forEach(el => el.classList.add('header-nav-scroll-up'));
  };

  const updateHeader = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll === 0) {
      // на самом верху
      clearResetTimeout();
      headerContainer.classList.remove('scroll-up');
      headerLogo.classList.remove('header-logo-scroll-up');
      headerPhone.classList.remove('add-border-scoll-up');
      getRequestBtns.forEach(btn => btn.classList.remove('add-border-scoll-up'));
      navs.forEach(el => el.classList.remove('header-nav-scroll-up'));
      navList.classList.remove('scroll-up-gap');
      header.classList.remove('header-hidden');
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
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
});
