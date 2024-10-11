window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    
    // Calculate the new height of the hero, but keep it at 0 when fully scrolled past it
    hero.style.height = "calc(100vh - " + scrolled + "px)";
    
    // Offset the content below the hero to compensate for its shrinking height
    document.body.style.marginTop = scrolled + 'px';
});





function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve,ms));
}

const phrases = ["Student of Kuben VGS", "Front & Back End Developer", ""];
const element = document.getElementById("typewriter")

let sleepTime = 75;

let curPhraseIndex = 0;

const writeLoop = async () => {
    while (true) {
        let curWord = phrases[curPhraseIndex]

        for (let i = 0; i < curWord.length; i++) {
            element.innerText = curWord.substring(0, i + 1);
            await sleep(sleepTime)
        }

        await sleep(sleepTime * 15);
        
        for (let i = curWord.length; i > 0; i--) {
            element.innerText = curWord.substring(0, i - 1);
            await sleep(sleepTime)
        }

        await sleep(sleepTime * 5);

        if (curPhraseIndex === phrases.length - 1) {
            curPhraseIndex = 0;
        } else {
            curPhraseIndex++;
        }
    }
};

writeLoop()