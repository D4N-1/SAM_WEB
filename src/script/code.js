const formGet = document.getElementById("contactForm")
const respuesta = document.getElementById("getRespuesta")

function crearDato(texto, valor) {
    let p = document.createElement("p")

    p.append(texto, valor)
    return p;
}

formGet.addEventListener("submit", function(event) {
    event.preventDefault()
    respuesta.innerHTML = ""
    const contacto = document.getElementById("contacto").value

    fetch(`https://api.sambot.live/contacts/uid/${contacto}`)
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
                crearDato("Whatsapp ID: ", data.uuid),
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

const postForm = document.getElementById("postCreateForm")
const contactoPost = document.getElementById("postContacto").value
const correoPost = document.getElementById("postCorreo").value
const nombrePost = document.getElementById("postNombre").value

postForm.addEventListener("submit", function(event) {
    event.preventDefault()
    const datosContacto = {
        uid: contactoPost,
        lid: correoPost,
        name: nombrePost
    }

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