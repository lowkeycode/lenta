// This show cases some JS validation with error/success message but the novalidate should be removed from the html


const errorMessageEl = document.querySelector('.error__message');
const form = document.querySelector('form');

let isValid = false;

const errorStyles = {
    backgroundColor: "#AF8A91",
    color: "#000",
    border: "2px solid #000"
}



const validateForm = function() {
    isValid = form.checkValidity();
    console.log(isValid);
    if(!isValid) {
        Object.assign(errorMessageEl.style, errorStyles);
        errorMessageEl.textContent = 'Please fill out all fields.'
    } else {
        errorMessageEl.textContent = 'We\'ll contact you shortly.'
    }

}

const processFormData = function(e) {
    e.preventDefault();
    validateForm();
}


// Event Listeners

form.addEventListener('submit', processFormData);


