import {types} from "../types/types"

const initialState = {
    nombre: '',
    apellido: '',
    token: null,
    isAuth: false,
    email: null,
    userId: null,
    role: null,
}


export const loginReducer = (state=initialState,action ) => {
 switch(action.type){
        case types.login:
            return{
                nombre: action.payload.nombre,
                apellido: action.payload.apellido,
                token: action.payload.token,    
                isAuth: true,
                email: action.payload.email,
                userId: action.payload.userId,
                role: action.payload.role
            }
        default:
            return state
    }

};


