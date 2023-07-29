var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var signBtn = document.getElementById("btnSign");
var loginBtn = document.getElementById("btnLogin");
var userList = [];
var loginForm = document.getElementById("login");
var signForm = document.getElementById("signup");
var logMail = document.getElementById("userEmail");
var logPass = document.getElementById("userPassword");

signBtn.addEventListener("click", addUser);
loginBtn.addEventListener("click", loginUser);


if (localStorage.getItem("userList")) {
    userList = JSON.parse(localStorage.getItem("userList"));
} else {
    userList = [];
}

function validateName() {
    var regex = /^[A-Za-z\s]{2,}$/;
    return regex.test(nameInput.value);
}

function validateEmail() {
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(emailInput.value);
}

function validatePassword() {
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{8,}$/
    return regex.test(passwordInput.value);
}

function clearForm() {
    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    logMail.value = "";
    logPass.value = "";
}

function addUser() {
    var existingUser = userList.find(user => user.email === emailInput.value);
    if (existingUser) {
        warning.classList.replace('text-danger', 'text-success');
        document.getElementById("warning").innerHTML = "Email already registered";
    } else if (!validateName() || !validateEmail() || !validatePassword()) {
        warning.classList.replace('text-success', 'text-danger');
        document.getElementById("warning").innerHTML = "Invalid inputs";
    } else if (validateName() && validateEmail() && validatePassword()) {
        var user = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };
        userList.push(user);
        localStorage.setItem("userList", JSON.stringify(userList));
        clearForm();
        warning.classList.replace('text-danger', 'text-success');
        document.getElementById("warning").innerHTML = "Success";
    } else {
        document.getElementById("warning").innerHTML = "Invalid inputs";
    }
}


function loginUser() {
    var loggedUser = userList.find(user => user.email === logMail.value);
    if (loggedUser && loggedUser.password === logPass.value) {
        warning.classList.replace('text-danger', 'text-success');
        clearForm();
        document.getElementById("success").innerHTML = "";
        swithToWelcome();
        document.getElementById("typeName").innerHTML = `Welcome ${loggedUser.name}`;
    } else if (logMail.value == '' || logPass.value == "") {
        warning.classList.replace('text-success', 'text-danger');
        document.getElementById("success").innerHTML = "invalid inputs";
    } else {
        warning.classList.replace('text-success', 'text-danger')
        document.getElementById("success").innerHTML = "Wrong Email or Password";
    }
}

var toSign = document.getElementById("toSign");
var toLogIn = document.getElementById("toLogin");
var logOutBtn = document.getElementById("logOut");

function swithToLogin() {
    loginForm.classList.replace('d-none', 'd-block');
    signForm.classList.replace('d-block', 'd-none');
    welcomePage.classList.replace('d-block', 'd-none');
}
function swithToWelcome() {
    loginForm.classList.replace('d-block', 'd-none');
    signForm.classList.replace('d-block', 'd-none');
    welcomePage.classList.replace('d-none', 'd-block');
}
function swithToSign() {
    loginForm.classList.replace('d-block', 'd-none');
    signForm.classList.replace('d-none', 'd-block');
    welcomePage.classList.replace('d-block', 'd-none');
}
toSign.addEventListener('click', swithToSign)
logOutBtn.addEventListener('click', swithToLogin)
toLogIn.addEventListener('click', swithToLogin)

