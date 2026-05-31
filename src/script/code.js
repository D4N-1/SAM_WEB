const contactsGetForm = document.getElementById("contactsGetForm")
const respuesta = document.getElementById("contactsGetAnswer")

function crearDato(texto, valor) {
    let p = document.createElement("p")

    p.append(texto, valor)
    return p;
}

contactsGetForm.addEventListener("submit", function(event) {
    event.preventDefault()
    respuesta.innerHTML = ""
    const contactsGetInputPhone = document.getElementById("contactsGetInputPhone").value

    fetch(`https://api.sambot.live/contacts/uid/${contactsGetInputPhone}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data) {
            let infocontainer = document.createElement("div")
            infocontainer.classList.add("info-container")
            infocontainer.id = "infoContainer"

            let p = document.createElement("p")
            
            infocontainer.append(
                crearDato("Nombre: ", data.name),
                crearDato("Numero: ", data.uid),
                crearDato("Whatsapp ID: ", data.lid),
                crearDato("Lid: ", data.lid),
                crearDato("Actualizado: ", data.updatedAt),
                crearDato("Creado: ", data.createdAt)
            )
            respuesta.append(infocontainer)
        }
    })
    .catch(error => {
        console.warn("error", error)
    })
})

const contactsPostForm = document.getElementById("contactsPostForm")

contactsPostForm.addEventListener("submit", function(event) {
    event.preventDefault()
    const contactoPost = document.getElementById("contactsPostInputPhone").value
    const whatsappId = document.getElementById("contactsPostInputWhatsappId").value
    const nombrePost = document.getElementById("contactsPostInputName").value
    const datosContacto = {
        uid: contactoPost,
        lid: whatsappId,
        name: nombrePost
    }
    console.log(datosContacto)

    fetch("https://api.sambot.live/contacts", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(datosContacto)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.log(error)
    })
})

