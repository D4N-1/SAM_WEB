async function check() {
    try {
        const response = await fetch("https://api.sambot.live/auth/me", {
        method: "GET",
        credentials: "include"
        })
        const data = await response.json()
    
        if (!response.ok) {
            window.location.replace("index")
        }
    
        console.log(data)
    }
    catch (error) {
        console.error("Error: "+error)
    }
}

check()