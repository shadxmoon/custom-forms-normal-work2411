const form = document.getElementById('form-registration');
const inputList = document.querySelectorAll('.form__field');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    inputList.forEach((inputElement) => {

        let textMessage = "";
        inputElement.classList.remove("invalid");
        inputElement.classList.remove("valid");
        inputElement.closest(".form__item").querySelector(".form__message-validate").innerHTML = "";

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
            inputElement.closest(".form__item").querySelector(".form__message-validate").innerHTML=textMessage;
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

