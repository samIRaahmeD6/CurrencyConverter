const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


let i =0;

for(let select of dropdowns){
    for(currCode in countryList){
        let newOptions = document.createElement("option");
        newOptions.innerText = currCode;
        newOptions.value = currCode;
        if(select.name === "from" && currCode === "USD"){
         newOptions.selected = "selected";
        }
        else if(select.name === "to" && currCode === "BDT"){
          newOptions.selected = "selected";
        }
        select.append(newOptions);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}


const updateFlag =  (element) =>{
let currCode = element.value;
let countryCode = countryList[currCode];
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src = newSrc;
};

btn.addEventListener("click", async(evt) =>{
evt.preventDefault();
let amount = document.querySelector(".amount input");
let amtVal = amount.value;
if(amtVal === "" || amtVal<1){
    amtVal = 1;
    amount.value = "1";
}

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let from = fromCurr.value.toLowerCase();
  let to = toCurr.value.toLowerCase();
  let rate = (data[from][to]);
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});

