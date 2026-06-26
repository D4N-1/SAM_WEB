import express from "express"
import path from "path"

let web = express()


web.get('/', (req, res) => {
    res.sendFile( path.resolve( "SAM_WEB", "index.html" ) )
})


export default web