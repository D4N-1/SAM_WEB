
const changeFormMail = document.getElementById("changeFormMail")
const changeFormPhone = document.getElementById("changeFormPhone")
const inputMailPhone = document.getElementById("inputMailPhone")
const prefix = document.getElementById("prefix")
const loginPasswordLabel = document.getElementById("loginPasswordLabel")
const loginCodeForm = document.getElementById("loginCodeForm")
const loginPasswordInput = document.getElementById("loginPasswordInput")
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

    if (loginCodeForm.dataset.currently === "password") {
        loginCodeForm.innerHTML = "Iniciar con contraseña"
        loginCodeForm.dataset.currently = "code"
        loginPasswordInput.placeholder = "Codigo"
        loginPasswordInput.type = "button"
        loginPasswordInput.value = "Enviar codigo"
        loginPasswordInput.classList.add("action-card__input--green")
        loginPasswordInput.style.width = "50%"
        submitForm.dataset.currently = "code"
    }

    else if (loginCodeForm.dataset.currently === "code") {
        loginCodeForm.dataset.currently = "password"
        loginCodeForm.innerHTML = "Iniciar con codigo"
        loginPasswordInput.type = "input"
        loginPasswordInput.value = ""
        loginPasswordInput.classList.remove("action-card__input--green")
        loginPasswordInput.style.width = "100%"
        loginPasswordInput.placeholder = "Contraseña"
    }
})

loginPasswordInput.addEventListener("click", (e) => {
    if (loginPasswordInput.type === "button") {
        loginPasswordInput.type = "input"
        loginPasswordInput.value = ""
        loginPasswordInput.textContent = "Codigo"
        loginPasswordInput.classList.remove("action-card__input--green")
        loginPasswordInput.style.width = "50%"
    }
})

submitForm.addEventListener("click", (event) => {
    event.preventDefault()
    let codigoEnviado = document.getElementById("codigoEnviado")
    function amongus() {
        const amogus = document.getElementById("amogus")
        amogus.style.display = "block"
        codigoEnviado.innerHTML = "Empece a juga el juego de amonugs"
        setTimeout(() => {
            codigoEnviado.innerHTML = "Pense que iba a ganar pero me mataron"
            setTimeout(() => {
                codigoEnviado.innerHTML = "El juego es muy entretenido"
                setTimeout(() => {
                    codigoEnviado.innerHTML = "Pero me mata siempre el asesino"
                    setTimeout(() => {
                        amongus()
                    }, 4000);
                }, 4000);
            }, 4000);
        }, 3000);
    }
    amongus()

})