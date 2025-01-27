// Load gold from local storage
function loadGold() {
    let gold = localStorage.getItem('gold');
    if (gold !== null) {
        player.gold = parseInt(gold);
    } else {
        // Default gold value if not found in local storage
        player.gold = 0;
    }
}

// Function to save the gold amount to local storage
function saveGold() {
    localStorage.setItem('gold', player.gold);
}

// Definer initielle health verdier.
let player = {
    name: "Player",
    abilities: [],
    health: 200,
    maxHealth: 200,
    charge: 0,
};

let enemy = {
    name: "Enemy",
    abilities: [], // Initialize abilities property as an empty array
    health: 200,
    maxHealth: 200,
    gold: 150
};

// Load abilities and enemy data from JSON file
fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
        player.abilities = data.abilities;
        enemy = data.enemy;
        updateGoldDisplay();
        addAttacks(player);
    });

// funksjon for å håndter spillerangrep
function playerAttack(ability) {
    if (document.getElementById('game-over').textContent !== "") {
        return; // Exit the function if the game is over
    }

    if (ability.name === "Charged Move (6)") {
        if (player.charge >= ability.chargeCost) {
            if (Math.random() < ability.chance) {
                console.log("Charged move used");
                enemy.health -= ability.damage;
                document.getElementById("blocked").textContent = null;
                player.charge -= ability.chargeCost;
            } else {
                document.getElementById("blocked").textContent = "Blocked";
                player.charge -= ability.chargeCost;
            }
        } else {
            // Display an alert if the player doesn't have enough charge for the charged move
            alert("You need " + (ability.chargeCost - player.charge) + " more charges to use this move");
            return; // Exit the function without doing any damage
        }
    } else {
        player.charge++;

        if (ability.name === "Uppercut") {
            if (Math.random() < ability.chance) {
                enemy.health -= ability.damage;
                document.getElementById("blocked").textContent = null;
            } else {
                document.getElementById("blocked").textContent = "Blocked";
            }
        } else {
            // For any other ability, deduct the damage from the enemy's health
            if (Math.random() < ability.chance) {
                enemy.health -= ability.damage;
                document.getElementById("blocked").textContent = null;
            } else {
                document.getElementById("blocked").textContent = "Blocked";
            }
        }
    }

    console.log(player.charge);
    updateHealthBars();

    if (enemy.health <= 0) {
        endGame('player');
    } else {
        enemyAttack();
    }
}

// Funksjon for fiendens angrep
function enemyAttack() {
    let totalChance = enemy.abilities.reduce((total, ability) => total + ability.chance, 0);
    let randomNum = Math.random() * totalChance;
    let cumulativeChance = 0;
    let selectedAbility;
    for (let i = 0; i < enemy.abilities.length; i++) {
        cumulativeChance += enemy.abilities[i].chance;
        if (randomNum < cumulativeChance) {
            selectedAbility = enemy.abilities[i];
            console.log("Enemy Attack Used:", selectedAbility.name);
            document.getElementById('enemy-move').textContent = `Used ${selectedAbility.name} (${selectedAbility.damage} ATK)`;
            break;
        }
    }

    let damage = selectedAbility.damage;
    player.health -= damage;

    updateHealthBars();

    if (player.health <= 0) {
        endGame('enemy');
    }
}

// funksjon for å oppdatere health bars
function updateHealthBars() {
    player.health = Math.max(player.health, 0);
    let playerHealthBarWidth = (player.health <= 0) ? 0 : (player.health * 100 / player.maxHealth);
    document.getElementById('player-health').style.width = playerHealthBarWidth + '%';
    document.getElementById('player-health').textContent = player.health;

    document.getElementById('charges').textContent = `Charges: ${player.charge}`;

    enemy.health = Math.max(enemy.health, 0);
    let enemyHealthBarWidth = (enemy.health <= 0) ? 0 : (enemy.health * 100 / enemy.maxHealth);
    document.getElementById('enemy-health').style.width = enemyHealthBarWidth + '%';
    document.getElementById('enemy-health').textContent = enemy.health;
}

// Funksjon som viser vinner
function endGame(winner) {
    if (winner === 'player') {
        player.gold += enemy.gold; // Add the enemy's gold to the player
        saveGold(); // Save the updated gold amount to local storage
        document.getElementById('game-over').textContent = "You win!";
        document.getElementById("game-over").style.color = "#4CAF50";
    } else {
        document.getElementById('game-over').textContent = "Enemy wins";
        document.getElementById("game-over").style.color = "#FF5733";
    }
    updateGoldDisplay(); // Update the gold display in the HTML
    updateHealthBars(); // Update health bars
}

/* Denne funksjonen legger alle tilgjengelige angrepene til spilleren inn i 
containeren slik at spilleren kan bruke angrepene */
function addAttacks(character) {
    let attackContainer = document.getElementById("attack-container");

    for (let i = 0; i < character.abilities.length; i++) {
        let ability = character.abilities[i];
        let button = document.createElement("button");
        button.textContent = ability.name;
        button.setAttribute("data-ability", JSON.stringify(ability));
        button.addEventListener("click", function () {
            let abilityData = JSON.parse(this.getAttribute("data-ability"));
            playerAttack(abilityData);
        });
        attackContainer.appendChild(button);
    }
}

updateHealthBars();
window.onload = addAttacks(player);

document.addEventListener("keydown", function (event) {
    if (document.getElementById('game-over').textContent !== "") {
        if (!event.target.classList.contains('attack-button')) {
            resetGame();
        }
    }
});

document.addEventListener("touchstart", function (event) {
    if (document.getElementById('game-over').textContent !== "") {
        resetGame();
    }
});

function resetGame() {
    player.health = player.maxHealth;
    enemy.health = enemy.maxHealth;
    player.charge = 0;
    updateHealthBars();
    document.getElementById('game-over').textContent = "";
    document.getElementById('enemy-move').textContent = "";
    let attackContainer = document.getElementById("attack-container");
    attackContainer.innerHTML = "";
    addAttacks(player);
}
