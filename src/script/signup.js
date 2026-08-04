const prefix = document.getElementById("prefix");

if (prefix && typeof libphonenumber !== "undefined") {
    const listaCodigos = libphonenumber.getCountries();
    prefix.innerHTML = "";

    const listaPaises = listaCodigos.map(codigoPais => {
        try {
            const prefijo = libphonenumber.getCountryCallingCode(codigoPais);
            return { codigoPais, prefijo };
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

const actionCard = document.querySelector(".action-card");
const sendCodeForm = document.getElementById("sendCodeForm")
const verificationForm = document.getElementById("verificationForm");
const signupForm = document.getElementById("signupForm")
const inputMailPhone = document.getElementById("inputMailPhone");
const loginPasswordInput = document.getElementById("loginPasswordInput");

let phone = "";
let email = "";

actionCard.addEventListener("click", async (e) => {
    const btnToEmail = e.target.closest("#changeFormToEmail");
    const btnToPhone = e.target.closest("#changeFormToPhone");
    const btnCodeForm = e.target.closest("#loginCodeForm");
    const inputPass = e.target.closest("#loginPasswordInput");

    /*if (btnToEmail) {
        e.preventDefault();
        document.getElementById("changeFormToPhone")?.classList.remove("hidden");
        btnToEmail.classList.add("hidden");

        inputMailPhone.type = "email";
        inputMailPhone.name = "email";
        phone = inputMailPhone.value;
        inputMailPhone.value = email;
        inputMailPhone.placeholder = "asd@mail.com";
        inputMailPhone.classList.remove("action-card__input--prefix");
        if (prefix) prefix.style.visibility = "hidden";
        return;
    }

    if (btnToPhone) {
        e.preventDefault();
        document.getElementById("changeFormToEmail")?.classList.remove("hidden");
        btnToPhone.classList.add("hidden");

        inputMailPhone.type = "tel";
        inputMailPhone.name = "contactUid";
        email = inputMailPhone.value;
        inputMailPhone.value = phone;
        inputMailPhone.placeholder = "12345678";
        inputMailPhone.classList.add("action-card__input--prefix");
        if (prefix) prefix.style.visibility = "visible";
        return;
    }

    if (btnCodeForm) {
        e.preventDefault();
        const currently = btnCodeForm.dataset.currently;

        if (currently === "password") {
            btnCodeForm.dataset.currently = "code";
            btnCodeForm.innerHTML = "Iniciar con contraseña";
            loginPasswordInput.placeholder = "Codigo";
            loginPasswordInput.type = "button";
            loginPasswordInput.value = "Enviar codigo";
            loginPasswordInput.classList.add("action-card__input--green");
            loginPasswordInput.style.width = "50%";
        } else {
            btnCodeForm.dataset.currently = "password";
            btnCodeForm.innerHTML = "Iniciar con codigo";
            loginPasswordInput.type = "text";
            loginPasswordInput.value = "";
            loginPasswordInput.name = "password";
            loginPasswordInput.classList.remove("action-card__input--green");
            loginPasswordInput.style.width = "100%";
            loginPasswordInput.placeholder = "Contraseña";
        }
        return;
    }

    if (inputPass && inputPass.type === "button") {
        inputPass.type = "text";
        inputPass.value = "";
        inputPass.name = "code";
        inputPass.placeholder = "Código";
        inputPass.classList.remove("action-card__input--green");
        inputPass.style.width = "50%";
        return;
    }
    */
});

sendCodeForm?.addEventListener("input", (e) => {
    if (e.target.name === "contactUid") {
        e.target.value = e.target.value.replace(/[^0-9 ]/g, "");
    }
})

sendCodeForm?.addEventListener("submit", async (e) => {
    e.preventDefault()
    
    const formData = new FormData(sendCodeForm);
    let datos = Object.fromEntries(
        Array.from(formData.entries()).map(([k, v]) => [
            k, 
            typeof v === 'string' ? v.trim() : v
        ])
    );
    

    if (inputMailPhone.name === "contactUid") {

        const telefono = datos.contactUid;
        if (telefono && telefono.trim()) {
            const codigoPais = prefix.value;
            const telefonoLimpio = libphonenumber.parsePhoneNumberFromString(telefono, codigoPais);
            phone = telefonoLimpio

            if (!telefonoLimpio || !telefonoLimpio.isValid()) {
                inputMailPhone.style.outline = "3px solid #f00";
                return; 
            }

            datos.contactUid = telefonoLimpio.countryCallingCode + telefonoLimpio.nationalNumber;
            inputMailPhone.style.outline = "none";
        }
    }

        try {
            const response = await fetch("https://api.sambot.live/auth/user/code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                const errorMessage = data?.message || data?.error || `${response.status} ${response.statusText}`;
                throw new Error(errorMessage);
            }

            if (data) {
                console.log("Codigo enviado correctamente", data);
            }
        } catch (error) {
            console.error("Error en submit:", error, datos);
        } finally {
            sendCodeForm.classList.add("hidden")
            verificationForm.classList.remove("hidden")
        }
})


verificationForm?.addEventListener("input", (e) => {

    if (e.target.name === "code") {
        let valor = e.target.value.toUpperCase();
        valor = valor.replace(/[^A-Z0-9]/g, '');
        e.target.value = valor.slice(0, 6);
    }
});

if (verificationForm) {
    verificationForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(verificationForm);
        formData.append("contactUid", phone)
        let datos = Object.fromEntries(
            Array.from(formData.entries()).map(([k, v]) => [
                k, 
                typeof v === 'string' ? v.trim() : v
            ])
        );

        try {
            const response = await fetch("https://api.sambot.live/auth/user/login", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                const errorMessage = data?.message || data?.error || `${response.status} ${response.statusText}`;
                throw new Error(errorMessage);
            }

            if (data) {
                console.log("Login respuesta:", data);
            }
        } catch (error) {
            console.error("Error en submit:", error);
        } finally {
            verificationForm.classList.add("hidden")
            signupForm.classList.remove("hidden")
        }
    });
}

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        fetch('/auth/user/code', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            contactUid: '573207654321',
            email: 'dani@email.com'
            })
        })

        const formData = new FormData(verificationForm);
        let datos = Object.fromEntries(
            Array.from(formData.entries()).map(([k, v]) => [
                k, 
                typeof v === 'string' ? v.trim() : v
            ])
        );

        try {
            const response = await fetch("https://api.sambot.live/auth/user/code", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                const errorMessage = data?.message || data?.error || `${response.status} ${response.statusText}`;
                throw new Error(errorMessage);
            }

            if (data) {
                console.log("Login respuesta:", data);
            }
        } catch (error) {
            console.error("Error en submit:", error);
        }
    })
}