const form = document.getElementById('form-registration');
const inputList = document.querySelectorAll('.form__field');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    inputList.forEach((inputElement) => {

        let textMessage = "";
        inputElement.classList.remove("invalid");
        inputElement.classList.remove("valid");
        const messageElement = inputElement.closest(".form__item").querySelector(".form__message-validate");
        if (messageElement) {
            messageElement.innerHTML = "";
        }

        if(inputElement.hasAttribute("required") && inputElement.value == ""){
            textMessage += "поле должно быть заполнено <br>"
        }
        
        if(inputElement.type == "email" && !isValidEmail(inputElement.value)) {
            textMessage += "электронная почта должна содержать символ @ ... <br>" 
        }

        if(inputElement.type == "password" && !isValidPassword(inputElement.value)) {
            textMessage += "пароль должен содержать минимум 8 символов<br>" 
        }
        if(textMessage != ""){
            if (messageElement) {
                messageElement.innerHTML = textMessage;
            }
            inputElement.classList.add("invalid");
        } else {
            inputElement.classList.add("valid");
        }
    }) 
});

function isValidEmail(email) {  
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return pattern.test(email);
}

function isValidPassword(password) {
    return password.length >= 8;
}


function changeCheckbox(elem){
    let item= document.getElementById(elem)
    switch (item.getAttribute("aria-checked")){
        case "true":
            item.setAttribute("aria-checked", "false")
            break;
        case "false":
            item.setAttribute("aria-checked", "true")
            break;
    }
}

document.addEventListener('DOMContentLoaded', function(){
    const colorLabels = document.querySelectorAll('.filter-color__label')
    colorLabels.forEach( label => {
        label.addEventListener('keydown', function(event){
            if (event.code === "Space"){
                event.preventDefault();
                changeCheckbox(this.id);
            }
        })
    })
})

let rangePrice = document.querySelector('input[type="range"].filter-price__slider');
rangePrice.style.setProperty('--value', rangePrice.value);
rangePrice.style.setProperty('--min', rangePrice.min == '' ? '0' : rangePrice.min);
rangePrice.style.setProperty('--max', rangePrice.max == '' ? '100' : rangePrice.max);
rangePrice.addEventListener('input', () => {
    rangePrice.style.setProperty('--value', rangePrice.value);
})

const rangeInput = document.querySelectorAll('.filter-delivery__range');
const progress = document.querySelector('.filter-delivery__progress');
const minValue = document.querySelector('.filter-delivery__min span');
const maxValue = document.querySelector('.filter-delivery__max span');

rangeInput.forEach(input => {
    input.addEventListener('input', e => {
        let minVal = parseInt(rangeInput[0].value);
        let maxVal = parseInt(rangeInput[1].value);

        if (maxVal - minVal < 0) {
            if (e.target.className === 'filter-delivery__range min') {
                rangeInput[0].value = maxVal;
            } else {
                rangeInput[1].value = minVal;
            }
        } else {
            minValue.textContent = minVal;
            maxValue.textContent = maxVal;
            progress.style.left = (minVal / rangeInput[0].max) * 100 + '%';
            progress.style.right = 100 - (maxVal/rangeInput[1].max)*100+'%';
        }
    });
});
