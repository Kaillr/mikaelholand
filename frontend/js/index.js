window.addEventListener('scroll', () => {
    const scrollOffset = window.pageYOffset * 0.5;
    const blurAmount = Math.min(window.pageYOffset / 25, 20);

    const hero = document.querySelector('.heroImage');
    hero.style.backgroundPosition = `center calc(50% + ${scrollOffset}px)`;
    hero.style.filter = `saturate(1.2) blur(${blurAmount}px)`;

    const aboutMe = document.querySelector('.me');
    aboutMe.style.marginTop = `${scrollOffset}px`; // Adjusted margin calculation
});
