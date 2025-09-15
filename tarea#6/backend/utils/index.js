import mongoose from "mongoose"

function validateObjectId(id, res){
    if(!mongoose.Types.ObjectId.isValid(id)){
        const error = new Error('El ID ingresado no es Valido!!!')
        return res.status(400).json({
            msg: error.message
        })
    }
}

function handleNotFoundError(message, error){
     error = new Error('El Servicio no existe!!!')
        return res.status(404).json({
            msg: error.message
        })
}

export{
    validateObjectId,
    handleNotFoundError
}

