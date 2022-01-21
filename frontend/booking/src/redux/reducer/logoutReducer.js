import {types} from "../types/types"

const initialState = {
    nombre: '',
    apellido: '',
    token: null,
    isAuth: false,
    email: null,
    userId: null
}


export const logoutReducer = (state=initialState,action ) => {
 switch(action.type){
        case types.logout:
            return{
                nombre: '',
                apellido: '',
                token: null,
                isAuth: false,
                email: null,
            }
        default:
            return state
    }

};
