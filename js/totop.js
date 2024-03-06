(() => {
    const upperLimit = 1000;
    const scrollElem = document.getElementById('totop');
    let isFadingOut = false, isFadingIn = false;

    // Initially hide the scroll to top link
    scrollElem.style.opacity = 0;
    scrollElem.style.display = 'none';
    scrollElem.style.transition = 'opacity 0.5s';

    const fadeOut = () => {
        if (isFadingIn) {
            isFadingIn = false;
        }
        if (!isFadingOut && scrollElem.style.opacity > 0) {
            isFadingOut = true;
            scrollElem.style.opacity = 0;
            setTimeout(() => {
                scrollElem.style.display = 'none';
                isFadingOut = false;
            }, 500); // Match transition duration
        }
    };

    const fadeIn = () => {
        if (isFadingOut) {
            isFadingOut = false;
        }
        if (!isFadingIn && scrollElem.style.opacity == 0) {
            scrollElem.style.display = 'block';
            isFadingIn = true;
            setTimeout(() => {
                scrollElem.style.opacity = 1;
                isFadingIn = false;
            }, 10); // Start fade in after a very short delay to ensure display is set to block
        }
    };

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > upperLimit) {
            fadeIn();
        } else {
            fadeOut();
        }
    });

    scrollElem.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
})();
