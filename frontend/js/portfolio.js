document.addEventListener("DOMContentLoaded", () => {
    fetch("../data/portfolio.json")
        .then(response => response.json())
        .then(data => {
            const portfolioContainer = document.querySelector(".portfolio");
            data.forEach(item => {
                const portfolioItem = document.createElement("div");
                portfolioItem.classList.add("portfolioItem");
                portfolioItem.innerHTML = `
                    <div class="portfolioImage" style="background-image: url(${item.image})">
                        <i class='bx bx-fullscreen'></i>
                    </div>
                    <div class="portfolioInfo">
                        <div class="backdropFilter"></div>
                        <p>${item.description}</p>
                        <a href="${item.link}" class="learnMore">${item.button ? item.button : 'Learn More'}</a>
                    </div>`;
                portfolioContainer.appendChild(portfolioItem);

                // Add event listener to the 'i' tag inside the portfolioImage div
                const fullscreenIcon = portfolioItem.querySelector('.portfolioImage .bx-fullscreen');
                fullscreenIcon.addEventListener('click', () => {
                    const parentDiv = fullscreenIcon.parentElement;
                    const backgroundImage = parentDiv.style.backgroundImage;
                    const imageUrl = backgroundImage.slice(5, -2); // Extract the URL

                    const fullscreenImg = document.querySelector('.fullscreen .media img');
                    fullscreenImg.src = imageUrl;

                    document.querySelector('.fullscreen').style.display = 'flex';
                });
            });

            VanillaTilt.init(document.querySelectorAll(".portfolioItem"), {
                max: 8,
                reverse: false,
                glare: true,
                "max-glare": 0.15,
            });
        })
        .catch(error => console.log("Error fetching portfolio data:", error));

    // Add event listener to hide fullscreen when clicking outside of the image
    const fullscreenDiv = document.querySelector('.fullscreen');
    fullscreenDiv.addEventListener('click', (event) => {
        const mediaDiv = fullscreenDiv.querySelector('.media');
        if (!mediaDiv.contains(event.target)) {
            fullscreenDiv.style.display = 'none';
        }
    });

    // Add event listener to hide fullscreen when clicking the 'i' tag inside .fullscreen .media
    const fullscreenMediaIcon = document.querySelector('.fullscreen .media i');
    fullscreenMediaIcon.addEventListener('click', () => {
        document.querySelector('.fullscreen').style.display = 'none';
    });
});
