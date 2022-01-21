import {types} from "../types/types"

const initialState = {
    stateFav: "",
}


export const favoriteReducer = (state=initialState,action ) => {
 switch(action.type){
        case types.favorite:
            return{
                stateFav : action.payload.state
            }
        default:
            return state
    }

};


