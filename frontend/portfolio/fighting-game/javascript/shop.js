// store.js

// Function to load the abilities available for purchase from the JSON file
function loadAbilities() {
    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            const abilities = data.abilities;
            const abilityContainer = document.getElementById('ability-container');

            abilities.forEach(ability => {
                const abilityElement = document.createElement('div');
                abilityElement.classList.add('ability');

                abilityElement.innerHTML = `
                    <h3>${ability.name}</h3>
                    <p>Damage: ${ability.damage}</p>
                    <p>Chance: ${ability.chance}</p>
                    <p>Cost: ${ability.cost} Gold</p>
                    <button class="buy-button" data-name="${ability.name}" data-cost="${ability.cost}">Buy</button>
                `;

                abilityContainer.appendChild(abilityElement);
            });
        });
}

// Load abilities when the page is loaded
window.onload = loadAbilities();
