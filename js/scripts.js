document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const headerLogo = document.querySelector('.header-logo');
    const navs = document.querySelectorAll('.header-nav ul li a');
    const headerPhone = document.querySelector('.header-phone');
    const getRequestBtn = document.querySelector('.get-request-btn');

    const resetScrollUpStyles = () => {
        headerLogo.classList.remove('header-logo-scroll-up');
        headerPhone.classList.remove('add-border-scoll-up');
        getRequestBtn.classList.remove('add-border-scoll-up');
        navs.forEach(nav => nav.classList.remove('header-nav-scroll-up'));
    };

    if (header) {
        let lastScroll = window.pageYOffset;

        // Скрыть header при загрузке, если не вверху
        if (lastScroll > 0) {
            header.classList.add('header-hidden');
            navs.forEach(nav => nav.classList.add('header-nav-scroll-up'));
            headerLogo.classList.add('header-logo-scroll-up');
            headerPhone.classList.add('add-border-scoll-up');
            getRequestBtn.classList.add('add-border-scoll-up');
        } else {
            resetScrollUpStyles();
            header.classList.remove('header-hidden');
        }

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll === 0) {
                resetScrollUpStyles();
                header.classList.remove('header-hidden');
                lastScroll = 0;
                return;
            }

            if (currentScroll > lastScroll) {
                // Скролл вниз — скрываем
                header.classList.add('header-hidden');

                setTimeout(() => {
                    navs.forEach(nav => nav.classList.add('header-nav-scroll-up'));
                }, 200);
            } else if (currentScroll < lastScroll) {
                // Скролл вверх — показываем
                header.classList.remove('header-hidden');
                headerLogo.classList.add('header-logo-scroll-up');
                headerPhone.classList.add('add-border-scoll-up');
                getRequestBtn.classList.add('add-border-scoll-up');
                navs.forEach(nav => nav.classList.add('header-nav-scroll-up'));
            }

            lastScroll = currentScroll;
        });
    }
});