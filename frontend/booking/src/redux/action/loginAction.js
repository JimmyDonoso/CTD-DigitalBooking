import {types} from '../types/types'

export const aLogin = (nombre, apellido, token, email,userId,role) => {
    return {
        type: types.login,
        payload: {
            nombre,
            apellido,
            token,
            email,
            userId,
            role
        },
    }; 
}

