// gold.js

// Function to save the gold amount to local storage
function saveGold() {
    localStorage.setItem('gold', player.gold);
}

// Function to load the gold amount from local storage
function loadGold() {
    let gold = localStorage.getItem('gold');
    if (gold !== null) {
        player.gold = parseInt(gold);
    } else {
        // Default gold value if not found in local storage
        player.gold = 0;
    }
}

// Function to update the gold display in the HTML
function updateGoldDisplay() {
    document.getElementById('gold-amount').textContent = `${player.gold} Gold`;
}

// Load gold amount when the page is loaded
window.onload = function() {
    loadGold();
    updateGoldDisplay();
};
