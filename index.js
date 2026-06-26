import express from "express"
import path from "node:path"
import cors from "cors"


const app = express();

app.use( express.json() );

app.use( cors() );

const PORT = 81;

app.use( express.static('src') )

app.get('/', async(req, res) => {
    res.status(200).sendFile( path.resolve( 'index.html') )
})

app.get('/login', async(req, res) => {
    res.status(200).sendFile( path.resolve( 'login.html') )
})


app.get('/home', async(req, res) => {
    res.status(200).sendFile( path.resolve( 'home.html') )
})


app.listen(PORT, '::', () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})