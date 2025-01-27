document.addEventListener("DOMContentLoaded", () => {
    const portfolioContainer = document.querySelector(".portfolio");
    const fullscreenDiv = document.querySelector('.fullscreen');

    fetch("../data/portfolio.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const portfolioItem = createPortfolioItem(item);
                portfolioContainer.appendChild(portfolioItem);
            });
            initializeTilt();
        })
        .catch(error => console.log("Error fetching portfolio data:", error));

    function createPortfolioItem(item) {
        const portfolioItem = document.createElement("div");
        portfolioItem.classList.add("portfolioItem");
        if (item.link) {
            portfolioItem.innerHTML = `
                <div class="portfolioImage" style="background-image: url(${item.image})">
                    <i class='bx bx-fullscreen'></i>
                </div>
                <div class="portfolioInfo">
                    <div>
                        <h2>${item.name}${item.name && item.date ? ' - ' : ''}${item.date}</h2>
                        <p>${item.description}</p>
                    </div>
                    <a href="${item.link}" target="_blank" rel="noopener noreferrer">Open Site</a>
                </div>`;
        } else {
            portfolioItem.innerHTML = `
                <div class="portfolioImage" style="background-image: url(${item.image})">
                    <i class='bx bx-fullscreen'></i>
                </div>
                <div class="portfolioInfo">
                    <div>
                        <h2>${item.name}${item.name && item.date ? ' - ' : ''}${item.date}</h2>
                        <p>${item.description}</p>
                    </div>
                    <button class="learnMore">${item.button ? item.button : 'View Image'}</button>
                </div>`;
            portfolioItem.querySelector('.learnMore').addEventListener('click', () => {
                if (item.Video) {
                    showFullscreen(item.Video, true);
                } else {
                    showFullscreen(item.image, false);
                }
            });
        }
        portfolioItem.querySelector('.portfolioImage').addEventListener('click', () => showFullscreen(item.image, false));
        return portfolioItem;
    }

    function showFullscreen(mediaUrl, isVideo) {
        const mediaDiv = fullscreenDiv.querySelector('.media');
        if (isVideo) {
            mediaDiv.innerHTML = `<i class='bx bx-x'></i><video controls autoplay><source src="${mediaUrl}" type="video/mp4"></video>`;
        } else {
            mediaDiv.innerHTML = `<i class='bx bx-x'></i><img src="${mediaUrl}">`;
        }
        fullscreenDiv.style.display = 'flex';
    }

    fullscreenDiv.addEventListener('click', (event) => {
        const mediaDiv = fullscreenDiv.querySelector('.media');
        if (!mediaDiv.contains(event.target) || event.target.tagName === 'I') {
            mediaDiv.innerHTML = "<i class='bx bx-x'></i>"; // Clear the content except the <i> tag
            fullscreenDiv.style.display = 'none';
        }
    });

    function initializeTilt() {
        if (!('ontouchstart' in window || navigator.maxTouchPoints)) {
            VanillaTilt.init(document.querySelectorAll(".portfolioItem"), {
                max: 4,
                reverse: false,
                glare: true,
                "max-glare": 0.15,
            });
        }
    }
});
