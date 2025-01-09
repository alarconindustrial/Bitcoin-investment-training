// Početne vrijednosti
let saldo = 1000; // Virtualni novac
let cijenaBitcoina = 50000; // Početna cijena Bitcoina

// Ažuriranje HTML elemenata
const saldoSpan = document.getElementById("balance");
const cijenaBitcoinaSpan = document.getElementById("bitcoin-price");
const porukaDiv = document.getElementById("message");

// Funkcija za simulaciju promjene cijene Bitcoina
function azurirajCijenuBitcoina() {
    const promjena = Math.floor(Math.random() * 2000) - 1000; // Promjena od -1000€ do +1000€
    cijenaBitcoina += promjena;
    if (cijenaBitcoina < 1000) cijenaBitcoina = 1000; // Minimalna vrijednost
    cijenaBitcoinaSpan.textContent = cijenaBitcoina.toLocaleString("hr-HR");
}

// Funkcija za ulaganje
function ulozi() {
    const unosInvesticije = document.getElementById("investment");
    const iznosInvesticije = parseFloat(unosInvesticije.value);

    if (isNaN(iznosInvesticije) || iznosInvesticije <= 0) {
        porukaDiv.textContent = "Molimo unesite ispravan iznos za ulaganje!";
        return;
    }

    if (iznosInvesticije > saldo) {
        porukaDiv.textContent = "Nemate dovoljno novca za ulaganje!";
        return;
    }

    // Umanji saldo i izračunaj dobitak/gubitak
    saldo -= iznosInvesticije;
    const profit = iznosInvesticije * (cijenaBitcoina / 50000); // Simulacija povrata
    saldo += profit;

    // Ažuriranje stanja
    saldoSpan.textContent = Math.round(saldo).toLocaleString("hr-HR");
    porukaDiv.textContent = `Uložili ste ${iznosInvesticije} €, a sada vrijedi ${Math.round(profit).toLocaleString("hr-HR")} €!`;

    // Osvježavanje cijene Bitcoina
    azurirajCijenuBitcoina();
}

// Event listener za ulaganje
document.getElementById("invest-btn").addEventListener("click", ulozi);

// Ažuriranje cijene svakih 5 sekundi
setInterval(azurirajCijenuBitcoina, 5000);
// Chat sustav
const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// function sendMessage() {
    const nickname = document.getElementById("nickname").value.trim() || "Anonimni"; // Zadano ime ako je prazno
    const poruka = chatInput.value.trim();
    if (poruka === "") return; // Ne šalji prazne poruke

    // Kreiranje HTML elemenata za poruku
    const porukaElement = document.createElement("p");
    porukaElement.textContent = `${nickname}: ${poruka}`;
    chatBox.appendChild(porukaElement);

    // Spremi poruku (ako koristiš LocalStorage ili JSON)
    spremiPoruku(`${nickname}: ${poruka}`);

    // Automatski skrolaj na dno chata
    chatBox.scrollTop = chatBox.scrollHeight;

    // Očisti unos nakon slanja
    chatInput.value = "";
}

}

// Event listener za gumb "Pošalji"
sendBtn.addEventListener("click", sendMessage);

// Omogućavanje slanja poruke pritiskom na Enter
chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});
const ctx = document.getElementById('bitcoin-chart').getContext('2d');
const bitcoinChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Vrijeme
        datasets: [{
            label: 'Cijena Bitcoina (€)',
            data: [], // Vrijednosti Bitcoina
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Vrijeme'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Cijena (€)'
                }
            }
        }
    }
});

// Funkcija za ažuriranje grafa
function azurirajGraf(cijena) {
    const vrijeme = new Date().toLocaleTimeString();
    bitcoinChart.data.labels.push(vrijeme);
    bitcoinChart.data.datasets[0].data.push(cijena);

    // Drži samo zadnjih 10 unosa na grafu
    if (bitcoinChart.data.labels.length > 10) {
        bitcoinChart.data.labels.shift();
        bitcoinChart.data.datasets[0].data.shift();
    }

    bitcoinChart.update();
}

// Ažuriraj graf svakih 5 sekundi
setInterval(() => {
    azurirajGraf(bitcoinPrice);
}, 5000);
