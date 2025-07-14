const express = require('express')
const app = express()
const mongoose = require('mongoose')
const usuario = require('./models/usuario')
const port = 3000

mongoose.connect('mongodb://localhost:27017/crud')
    .then(()=>console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar MongoDB:',err))


app.use(express.json())


//Obtencion de usuarios
app.get('/usuarios',async(req,res)=>{
    try{
        const usuarios = await usuario.find()
        res.json(usuarios)

    }catch(error){res.status(500).json({mensaje:'Error al obtener usuarios',error})}
})

//Creacion de usuarios
app.post('/usuarios',async (req,res)=>{
    try{
        const usuarioNuevo = new usuario(req.body)
        await usuarioNuevo.save()
        res.status(201).json(usuarioNuevo)
    }catch(error){res.status(400).json({mensaje:'Error al crear usuario',error})}
})

//Actualizacion de usuarios
app.put('/usuarios/:id', async(req,res)=>{
try{
    const usuarioActualizado = await usuario.findByIdAndUpdate(
        req.params.id,
        req.body,

        {new:true, runValidators:true}
    )
    if(!usuarioActualizado){
        return res.status(404).json({mensaje:'Usuario no encontrado'})
    }
    res.json(usuarioActualizado)
}catch(error){
    res.status(400).json({mensaje:'Error al actualizar usuario',error})
}

})
//Borrado de usuarios

app.delete('/usuarios/:id',async (req,res) => {
    try {
        const usuarioEliminado = await usuario.findByIdAndDelete(req.params.id)

        if(!usuarioEliminado){
            return res.status(404).json({mensaje:'Error Usuario no encontrado'})
        }
        res.json({mensaje:'USuario eliminado con exito',usuario:usuarioEliminado})
        
    } catch (error) {
        res.status(400).json({mensaje:'Error al eliminar usuario', error})
        
    }
})

app.get('/',(req,res)=>{
    res.status(200).json({mensaje:'API funcionando'})
})

app.use((req,res)=>{
    res.status(404).json({mensaje:'Ruta no encontrada'})
})
app.listen(port,()=>console.log('Server corriendo en el puerto:',port))

