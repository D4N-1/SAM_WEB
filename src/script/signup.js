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

const sendCodeForm = document.getElementById("sendCodeForm");
const verificationForm = document.getElementById("verificationForm");
const signupForm = document.getElementById("signupForm");
const signupformBack = document.getElementById("signupformBack");
const inputMailPhone = document.getElementById("inputMailPhone");

let phone = "";
let currentStep = 1;

const forms = [sendCodeForm, verificationForm, signupForm];

function goToForm(targetStep) {
    if (targetStep === currentStep || targetStep < 1 || targetStep > forms.length) return;

    const currentForm = forms[currentStep - 1];
    const targetForm = forms[targetStep - 1];
    const isForward = targetStep > currentStep;

    const exitClass = isForward ? "anim__vanish-form" : "anim__vanish-form--to-right";
    const enterClass = isForward ? "anim__appear-form" : "anim__appear-form--from-left";

    
    currentForm.classList.add(exitClass);

    setTimeout(() => {
    
        currentForm.classList.add("d-none");
        currentForm.classList.remove(exitClass);

        
        targetForm.classList.remove("d-none");
        targetForm.classList.add(enterClass);

        setTimeout(() => {
            
            targetForm.classList.remove(enterClass);
        }, 500);

        currentStep = targetStep;
        updateBackButton();
    }, 500);
}
updateBackButton();
function updateBackButton() {
    if (signupformBack) {
        if (currentStep === 1) {
            signupformBack.classList.add("hidden");
        } else {
            signupformBack.classList.remove("hidden");
        }
    }
}

signupformBack?.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentStep > 1) {
        goToForm(currentStep - 1);
    }
});

sendCodeForm?.addEventListener("input", (e) => {
    if (e.target.name === "contactUid") {
        e.target.value = e.target.value.replace(/[^0-9 ]/g, "");
    }
});

sendCodeForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = new FormData(sendCodeForm);
    let datos = Object.fromEntries(formData.entries());

    if (datos.contactUid && datos.contactUid.trim()) {
        const codigoPais = prefix.value;
        const telefonoLimpio = libphonenumber.parsePhoneNumberFromString(datos.contactUid, codigoPais);

        if (!telefonoLimpio || !telefonoLimpio.isValid()) {
            inputMailPhone.style.outline = "3px solid #f00";
            return; 
        }

        phone = telefonoLimpio;
        datos.contactUid = telefonoLimpio.countryCallingCode + telefonoLimpio.nationalNumber;
        inputMailPhone.style.outline = "none";
    }

    try {
        const response = await fetch("https://api.sambot.live/auth/user/code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        if (!response.ok) throw new Error("Error enviando código");
    } catch (error) {
        console.error("Error:", error);
    } finally {
        document.getElementById("phoneCodeSent").textContent = `Código enviado a ${phone.number || ''}`;
        goToForm(2);
    }
});

verificationForm?.addEventListener("input", (e) => {
    if (e.target.name === "code") {
        let valor = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        e.target.value = valor.slice(0, 6);
    }
});

verificationForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(verificationForm);
    formData.append("contactUid", phone.number || "");
    let datos = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("https://api.sambot.live/auth/user/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        if (!response.ok) throw new Error("Código inválido");
    } catch (error) {
        console.error("Error:", error);
    } finally {
        document.getElementById("phoneCodeSent").textContent = ""
        goToForm(3);
    }
});

signupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(signupForm);
    let datos = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("https://api.sambot.live/auth/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        if (response.ok) console.log("Usuario registrado con éxito");
    } catch (error) {
        console.error("Error en registro final:", error);
    } finally {

    }
});