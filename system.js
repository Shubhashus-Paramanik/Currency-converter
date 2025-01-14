const Base_URL="https://v6.exchangerate-api.com/v6/e0e8102a659df5e67e7c633a/latest";

// for(code of dropdown){
//     console.log(code.value);
// }
const dropdown=document.querySelectorAll(".select-container select");
let but=document.querySelector("#btn"); 
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const messag=document.querySelector("#Rate_msg");
//first time when our document load then work this type->


for(let select of dropdown){
    for(let currencycode in countryList){
     
        let newOption=document.createElement("option");
        newOption.innerText=currencycode;
        newOption.value=currencycode;
        if(select.name==="FromSelect" && currencycode==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="ToSelect" && currencycode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);

    }
    select.addEventListener("change",(e)=>{
        updateflag(e.target);
    })
}
const updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
let amtVal=amount.value;
if(amtVal===""|| amtVal<1){
    amtVal=1;
    amount.value="1";
}


const Url=`${Base_URL}/${fromcurr.value}`;
let response=await fetch(Url);
let data=await response.json();
let rate=data.conversion_rates[tocurr.value]
let finalAmount=amtVal*rate;
messag.innerHTML=`${amtVal} ${fromcurr.value}=${finalAmount} ${tocurr.value}`;

}

const updateflag=(element)=>{
let currcode=element.value;
let countyCode=countryList[currcode];
//console.log(countyCode);
let newSrc=`https://flagsapi.com/${countyCode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newSrc;
};


but.addEventListener("click",(evt)=>{
evt.preventDefault();//preventDefault stop the refreshing movement or automatically work
updateExchangeRate();
});

window.addEventListener("load",()=>{//here we upload on window, not document
    updateExchangeRate();
    })
    