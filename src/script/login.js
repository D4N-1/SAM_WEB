
const changeFormMail = document.getElementById("changeFormMail")
const changeFormPhone = document.getElementById("changeFormPhone")
const inputMailPhone = document.getElementById("inputMailPhone")
const prefix = document.getElementById("prefix")
const loginPasswordLabel = document.getElementById("loginPasswordLabel")
const loginCodeForm = document.getElementById("loginCodeForm")
const loginPasswordInput = document.getElementById("loginPasswordInput")
const loginCodeBtn = document.getElementById("loginCodeBtn")
const submitForm = document.getElementById("submitForm")

changeFormPhone.addEventListener("click", (event) => {
    event.preventDefault()
    changeFormMail.classList.remove("hidden")
    inputMailPhone.setAttribute("type", "tel")
    inputMailPhone.placeholder = "12345678"
    inputMailPhone.classList.add("action-card__input--prefix")
    prefix.style.visibility = "visible"

    changeFormPhone.classList.add("hidden")
})

changeFormMail.addEventListener("click", (event) => {
    event.preventDefault()
    changeFormPhone.classList.remove("hidden")
    inputMailPhone.setAttribute("type", "email")
    inputMailPhone.placeholder = "asd@mail.com"
    inputMailPhone.classList.remove("action-card__input--prefix")
    prefix.style.visibility = "hidden"

    changeFormMail.classList.add("hidden")
})

loginCodeForm.addEventListener("click", (event) => {
    event.preventDefault()
    loginCodeForm.style.pointerEvents = "none"

    if (loginCodeForm.dataset.currently === "password") {
        loginPasswordLabel.classList.add("login-password-desaparecer")
        loginCodeForm.innerHTML = "Iniciar con contraseña"
        loginCodeForm.dataset.currently = "code"
        loginPasswordInput.placeholder = "Codigo"
        loginPasswordInput.style.cursor = "not-allowed"
        setTimeout(() => {
            loginCodeBtn.style.display = "block"
        }, 300);
        setTimeout(() => {
            loginPasswordLabel.classList.remove("login-password-desaparecer")
        }, 1000);
        submitForm.dataset.currently = "code"
        
    }

    else if (loginCodeForm.dataset.currently === "code") {
        loginPasswordLabel.classList.add("login-password-desaparecer")
        loginCodeForm.dataset.currently = "password"
        loginCodeForm.innerHTML = "Iniciar con codigo"
        loginPasswordInput.style.cursor = "initial"
        setTimeout(() => {
            loginCodeBtn.style.display = "none"
        }, 300);
        loginPasswordLabel.classList.add("login-password-aparecer")
        loginPasswordInput.placeholder = "Contraseña"
        setTimeout(() => {
            loginPasswordLabel.classList.remove("login-password-desaparecer")
        }, 1000);
    }

    setTimeout(() => {
        loginCodeForm.style.pointerEvents = "auto"
    }, 1000);
})

loginCodeBtn.addEventListener("click", (e) => {
    e.preventDefault()
    loginPasswordInput.style.cursor = "initial"
    loginCodeBtn.innerHTML = "Codigo enviado"
})

submitForm.addEventListener("click", (event) => {
    event.preventDefault()
    if (submitForm.dataset.currently === "password") {

    }

    else if (submitForm.dataset.currently === "code") {
        submitForm.innerHTML = "Iniciar"
        let codigoEnviado = document.getElementById("codigoEnviado")
        codigoEnviado.innerHTML = "El codigo ha sido enviado!"
    }
})