
const BASE_URL = "https://api.frankfurter.app/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
    for (let currcode in countrylist) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;

        if (select.name === "from" && currcode === "USD") {
            newoption.selected = "selected";
        } else if (select.name === "to" && currcode === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}

// Function to update exchange rate
const updateexchangerate = async () => {
    let amount = document.querySelector(".amount input");
    let amtval = amount.value.trim();
    
    if (amtval === "" || isNaN(amtval) || amtval <= 0) {
        amount.value = "1";
        amtval = 1;
    }

    let fromCurrency = fromcurr.value;
    let toCurrency = tocurr.value;

    if (fromCurrency === toCurrency) {
        msg.innerText = "Please select different currencies!";
        return;
    }

    try {
        const URL = `${BASE_URL}?amount=${amtval}&from=${fromCurrency}&to=${toCurrency}`;
        let response = await fetch(URL);
        let data = await response.json();

        let rate = data.rates[toCurrency];
        let finalamount = (amtval * rate).toFixed(2);

        msg.innerText = `${amtval} ${fromCurrency} = ${finalamount} ${toCurrency}`;
    } catch (error) {
        msg.innerText = "Error fetching exchange rate!";
    }
};

// Function to update country flag
const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countrylist[currcode];

    if (countrycode) {
        let img = element.parentElement.querySelector("img");
        img.src = `https://flagsapi.com/${countrycode}/flat/64.png`;
    }
};

// Event listeners
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateexchangerate();
});

window.addEventListener("load", () => {
    updateexchangerate();
});
