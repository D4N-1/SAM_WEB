
const changeFormMail = document.getElementById("changeFormMail")
const changeFormPhone = document.getElementById("changeFormPhone")
const inputMailPhone = document.getElementById("inputMailPhone")
const prefix = document.getElementById("prefix")
const loginPasswordLabel = document.getElementById("loginPasswordLabel")
const loginCodeForm = document.getElementById("loginCodeForm")
const loginPasswordInput = document.getElementById("loginPasswordInput")
const submitFormButton = document.getElementById("submitFormButton")

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
        submitFormButton.dataset.currently = "code"
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

const loginForm = document.getElementById("loginForm")

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        const formData = new FormData(loginForm)
        const datos = Object.fromEntries(formData.entries())
        
        const telefono = datos.contactUid;
        const codigoPais = prefix.value;

        const telefonoValido = libphonenumber.isValidPhoneNumber(telefono, codigoPais);

        if (!telefonoValido) {
            console.log("numero mal")
            return; 
        }

        const telefonoLimpio = libphonenumber.parsePhoneNumber(telefono, codigoPais);
        datos.contactUid = telefonoLimpio.countryCallingCode + telefonoLimpio.nationalNumber;
        console.log(datos.contactUid)
        try {
            const response = await fetch("https://api.sambot.live/auth/user/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error("error")
            }

            if (data.access_token) {
                console.log(data.access_token)
            }
        }
        catch (error) {
            console.error("Error: "+error)
        }
    })
}

const a = document.getElementById("a")

if (a) {
    a.addEventListener("click", async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("https://api.sambot.live/auth/me", {
            method: "GET",
            credentials: "include"
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error("error")
            }

            console.log(data)
        }
        catch (error) {
            console.error("Error: "+error)
        }
    })
}

if (prefix && typeof libphonenumber !== "undefined") {
    const listaCodigos = libphonenumber.getCountries()

    prefix.innerHTML = "";

    const listaPaises = listaCodigos.map(codigoPais => {
        try {
            
            const prefijo = libphonenumber.getCountryCallingCode(codigoPais);

            return { codigoPais, prefijo};
        } catch (e) {
            return null;
        }
    }).filter(Boolean);

    listaPaises.sort((a, b) => a.codigoPais.localeCompare(b.codigoPais, 'es'));
    listaPaises.forEach(pais => {
        const option = document.createElement("option");
        option.value = pais.codigoPais;
        option.textContent = `${pais.codigoPais} +${pais.prefijo}`;

        if (pais.codigoPais === 'CO') option.selected = true;

        prefix.append(option);
    });
}

if (inputMailPhone) {
    inputMailPhone.addEventListener("input", (e) => {
        
        e.target.value = e.target.value.replace(/[^0-9 ]/g, "");
    });
}