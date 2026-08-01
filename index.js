import express from "express"
import path from "node:path"
import cors from "cors"
import fs from "node:fs/promises"


const ROUTES = 'routes'
const app = express();

app.use( express.json() );

app.use( cors() );

const PORT = 81;

app.use( express.static('src') )

app.get('/', async(req, res) => {
    res.status(200).sendFile( path.resolve( ROUTES, 'root', 'index.html' ) )
})

app.get('/login', async(req, res) => {
    res.status(200).sendFile( path.resolve( ROUTES, 'login', 'login.html' ) )
})


app.get('/home', async(req, res) => {
    res.status(200).sendFile( path.resolve( ROUTES, 'home', 'home.html' ) )
})


app.get('/random', async(req, res) => {

    const route = path.resolve( 'src', 'media', 'images' )
    const files = await fs.readdir(route)

    res.set({
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
    });

    res.status(200).sendFile( path.resolve( route, files[ Math.floor( Math.random() * files.length )] ) )

})


app.listen(PORT, '::', () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})