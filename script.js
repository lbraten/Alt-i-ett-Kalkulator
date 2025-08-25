document.addEventListener("DOMContentLoaded", () => {
    // Dagens dato og tid
    function updateDateTime() {
        const now = new Date();
        document.getElementById('currentDateTime').innerText = now.toLocaleString();
    }
    setInterval(updateDateTime, 1000);

    // Prosentkalkulator
    document.getElementById('percentButton').addEventListener('click', () => {
        const value = parseFloat(document.getElementById('percentValue').value);
        const percent = parseFloat(document.getElementById('percentPercent').value);
        document.getElementById('percentResult').innerText = (value * percent / 100).toFixed(2);
    });

    // Timeslønn fra månedslønn
    document.getElementById('hourlyButton').addEventListener('click', () => {
        const salary = parseFloat(document.getElementById('monthlySalary').value);
        const hours = parseFloat(document.getElementById('hoursPerWeek').value);
        const yearlyHours = hours * 52;
        const hourly = (salary * 12 / yearlyHours).toFixed(2);
        document.getElementById('hourlyResult').innerText = `Timeslønn: ${hourly} kr/t`;
    });

    // Alderskalkulator
    // Mer avansert alderskalkulator
    document.getElementById('ageButton').addEventListener('click', () => {
        const birth = new Date(document.getElementById('birthDate').value);
        const now = new Date();

        // Forsikre oss om at datoen er gyldig
        if (isNaN(birth)) {
            document.getElementById('ageResult').innerText = "Vennligst skriv inn en gyldig dato.";
            return;
        }

        // Total forskjell i millisekunder
        const diffMs = now - birth;

        // Konverter til år med desimaler
        const ageInYears = diffMs / (1000 * 60 * 60 * 24 * 365.25); // 365.25 tar hensyn til skuddår
        const ageRounded = Math.floor(ageInYears * 10) / 10; // rund av til 1 desimal, f.eks. 18.5

        // Alternativt: vis år + måneder
        const years = Math.floor(ageInYears);
        const months = Math.floor((ageInYears - years) * 12);

        document.getElementById('ageResult').innerText = 
            `Omtrent ${ageRounded} år (${years} år og ${months} måneder).`;
    });

// Differanse mellom datoer
document.getElementById('dateDiffButton').addEventListener('click', () => {
    const d1 = new Date(document.getElementById('date1').value);
    const d2 = new Date(document.getElementById('date2').value);
    
    // Forskjell i millisekunder og dager
    const diffMs = Math.abs(d2 - d1);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    // Beregn år og måneder
    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    if (months < 0) {
        years--;
        months += 12;
    }
    
    document.getElementById('dateDiffResult').innerHTML =
        `Forskjell: ${diffDays} dager<br>(${years} år og ${months} måneder)`;
});


    // Tidssoner (dropdown)
    document.getElementById('timezoneButton').addEventListener('click', () => {
        const tzSelect = document.getElementById('timezoneSelect');
        const tzId = tzSelect.value;
        const tzLabel = tzSelect.options[tzSelect.selectedIndex].text;

        try {
            const now = new Date().toLocaleString("nb-NO", { timeZone: tzId });
            document.getElementById('timezoneResult').innerText = `Tid i ${tzLabel}: ${now}`;
        } catch {
            document.getElementById('timezoneResult').innerText = `Ugyldig tidssone`;
        }
    });

    // Minutter til timer/dager
    document.getElementById('minutesButton').addEventListener('click', () => {
        const mins = parseFloat(document.getElementById('minutesInput').value);
        const hours = (mins / 60).toFixed(2);
        const days = (mins / 60 / 24).toFixed(2);
        document.getElementById('minutesResult').innerText = `${mins} minutter ≈ ${hours} timer ≈ ${days} dager`;
    });

    // Kalkulator
    const calcDisplay = document.getElementById("calcDisplay");
    const buttons = document.querySelectorAll(".calc-btn");
    let currentInput = "";

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;

            if (button.id === "clear") {
                currentInput = "";
                calcDisplay.value = "";
            } else if (button.id === "equals") {
                try {
                    currentInput = eval(currentInput).toString();
                    calcDisplay.value = currentInput;
                } catch {
                    calcDisplay.value = "Error";
                    currentInput = "";
                }
            } else {
                currentInput += value;
                calcDisplay.value = currentInput;
        }
    });
});
    //valutakalkulator
    document.getElementById("convertBtn").addEventListener("click", async () => {
        console.log("👉 Knapp trykket");
        
        const amount = document.getElementById("amount").value;
        const currency = document.getElementById("currency").value;
        console.log("Beløp (NOK):", amount, "Valgt valuta:", currency);

        if (!amount || amount <= 0) {
            document.getElementById("result").innerText = "Skriv inn et gyldig beløp!";
            console.log("⚠️ Feil: ugyldig beløp");
            return;
        }

        try {
            console.log("🔄 Henter data fra API...");
            const res = await fetch(`https://api.exchangerate.host/latest?base=NOK&symbols=${currency}`);
            const data = await res.json();
            console.log("✅ API-respons:", data);

            const rate = data.rates[currency];
            console.log("Valutakurs:", rate);

            const converted = (amount * rate).toFixed(2);
            console.log(`Utregning: ${amount} NOK = ${converted} ${currency}`);

            document.getElementById("result").innerText =
                `${amount} NOK = ${converted} ${currency}`;
            } catch (error) {
                console.error("❌ API-feil:", error);
                document.getElementById("result").innerText = "Kunne ikke hente valutakurs";
            }
            });



});
