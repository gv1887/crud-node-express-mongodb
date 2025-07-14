const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    edad:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})

const usuario = mongoose.model('usuario',usuarioSchema)

module.exports = usuario;