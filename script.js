const form = document.querySelector("form");

const billAmount = form.querySelector("#bill-amount");
const percentages = form.querySelectorAll("input[type=radio]");
const customPercentage = form.querySelector("#custom-percentage");
const numberOfPeople = form.querySelector("#number-of-people");

const billAmountError = form.querySelector("#bill-amount-error");
const percentageError = form.querySelector("#percentage-error");
const numberOfPeopleError = form.querySelector("#number-of-people-error");

const tipAmountResult = document.getElementById("tip-amount");
const totalResult = document.getElementById("total");

const resetButton = document.getElementById("reset-btn");

function isNumeric(input) {
    return /^\d+$/.test(input);
  }

function showError(input,error,msg){
    error.textContent=`${msg}`;
    input.style.border="2px solid var(--dark-red)";
}

/* To remove the checked radio button when user puts a custom percentage */
function removeCheckedRadio(){
    customPercentage.addEventListener("input",()=>{
        const checkedButton = form.querySelector("input[type=radio]:checked");
        if(checkedButton){
            checkedButton.checked=false;
        }
    });
}

/* To remove the custom percentage when user chooses a radio button */
function removeCustomPecentage(){
    percentages.forEach(percentage=>{
        percentage.addEventListener("click",()=>{
            customPercentage.value="";
        });
    });
}

function removeErrors(){
    billAmountError.textContent="";
    billAmount.style.borderColor="";

    percentageError.textContent="";

    numberOfPeopleError.textContent="";
    numberOfPeople.style.borderColor="";
}

function validateInputs(){
    const checkedButton = form.querySelector("input[type=radio]:checked");
    let valid=true;

    if(billAmount.value===""){
        showError(billAmount,billAmountError,"Can't be empty");
        valid=false;
    }
    else if(billAmount.value==="0"){
        showError(billAmount,billAmountError,"Can't be zero");
        valid=false;
    }
    else if(!isNumeric(billAmount.value)){
        showError(billAmount,billAmountError,"Must be a number");
        valid=false;
    }

    if(!checkedButton && customPercentage.value===""){
        percentageError.textContent="Can't be empty";
        valid=false;
    }

    if(!isNumeric(customPercentage.value)){
        percentageError.textContent="Must be a number";
        valid=false;
    }

    if(numberOfPeople.value===""){
        showError(numberOfPeople,numberOfPeopleError,"Can't be empty");
        valid=false;
    }
    else if(numberOfPeople.value==="0"){
        showError(numberOfPeople,numberOfPeopleError,"Can't be zero");
        valid=false;
    }
    else if(!isNumeric(numberOfPeople.value)){
        showError(numberOfPeople,numberOfPeopleError,"Must be a number");
        valid=false;
    }

    return(valid);
}

function showResult(){
    const amount = parseFloat(billAmount.value);
    const percentage = parseFloat(customPercentage.value!=="" ? customPercentage.value : form.querySelector("input[type=radio]:checked").value);
    const number = parseInt(numberOfPeople.value);

    const TipAmountPerPerson = parseFloat((((amount/100)*percentage)/number).toFixed(2));
    const totalPerPerson = ((amount/number)+TipAmountPerPerson).toFixed(2);

    tipAmountResult.textContent=`$${TipAmountPerPerson}`;
    totalResult.textContent=`$${totalPerPerson}`;
}

function reset(){
    resetButton.addEventListener("click",()=>{
        removeErrors();
        form.reset();
    })
}

form.addEventListener("keypress",(e)=>{
    if(e.key==="Enter"){
        e.preventDefault();
        removeErrors();

        if(validateInputs()){
            showResult();
            resetButton.style.opacity="1";
        }
    }
});

removeCheckedRadio();
removeCustomPecentage();
reset();