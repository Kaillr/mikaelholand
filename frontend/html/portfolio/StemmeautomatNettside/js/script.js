function vote(party) {
  // Øker verdien til partiet med 1
  eval(`${party} += 1`);

  // Lagrer dataen i local storage
  localStorage.setItem(party, eval(party));

  // Oppdaterer dataen i diagrammet
  chart.data.datasets[0].data = [H, V, KRF, SV, FRP, MDG, SP, R, AP];

  // Oppdaterer diagrammet
  chart.update();
}

// Henter verdien for partiet fra lokal lagring, hvis det ikke finnes blir standardverdien satt til 0
let H = parseInt(localStorage.getItem("H")) || 0;
let V = parseInt(localStorage.getItem("V")) || 0;
let KRF = parseInt(localStorage.getItem("KRF")) || 0;
let SV = parseInt(localStorage.getItem("SV")) || 0;
let FRP = parseInt(localStorage.getItem("FRP")) || 0;
let MDG = parseInt(localStorage.getItem("MDG")) || 0;
let SP = parseInt(localStorage.getItem("SP")) || 0;
let R = parseInt(localStorage.getItem("R")) || 0;
let AP = parseInt(localStorage.getItem("AP")) || 0;

const ctx = document.getElementById("myChart").getContext("2d");

// Endrer søyle fargen til partiene
const partyColors = {
  H: "rgba(37,124,225,0.8)",
  V: "rgba(0,71,46,0.8)",
  KRF: "rgba(249,161,52,0.8)",
  SV: "rgba(175,0,97,0.8)",
  FRP: "rgba(207,21,45,0.8)",
  MDG: "rgba(207,21,45,0.8)",
  SP: "rgba(207,21,45,0.8)",
  R: "rgba(112,29,69,0.8)",
  AP: "rgba(207,21,45,0.8)",
};

const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Høyre", "Venstre", "KRF", "SV", "FRP", "MDG", "SP", "Rødt", "AP"],
    datasets: [{
      label: "# of Votes",
      data: [H, V, KRF, SV, FRP, MDG, SP, R, AP],
      backgroundColor: Object.values(partyColors),
      borderWidth: 1
    }]
  },
  options: {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});

function clearVotes() {
  // Setter stemmetallene til 0 i lokal lagring
  localStorage.setItem("H", 0);
  localStorage.setItem("V", 0);
  localStorage.setItem("KRF", 0);
  localStorage.setItem("SV", 0);
  localStorage.setItem("FRP", 0);
  localStorage.setItem("MDG", 0);
  localStorage.setItem("SP", 0);
  localStorage.setItem("R", 0);
  localStorage.setItem("AP", 0);


  // Oppdaterer lokale variabler til 0
  H = 0;
  V = 0;
  KRF = 0;
  SV = 0;
  FRP = 0;
  MDG = 0;
  SP = 0;
  R = 0;
  AP = 0;

  // Oppdaterer dataen i diagrammet
  chart.data.datasets[0].data = [H, V, KRF, SV, FRP, MDG, SP, R, AP];

  // Oppdaterer diagrammet
  chart.update();
}