const express = require("express")

require('dotenv').config()
const cors = require("cors")
const path = require("path"); 




const app = express()

app.use(express.json())
app.use(cors())



const puerto = 2000

app.use(express.static(path.join(__dirname,  "..", "Frontend", "dist")))


app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'..', 'Frontend', 'index.html'))
})

app.listen(puerto, ()=>{
    
        console.log(`Conectados en el servidor en ${puerto}`)
        
 
})