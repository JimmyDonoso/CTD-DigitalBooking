import {types} from "../types/types"

const initialState = {
    startDate: null,
    endDate: null,
}


export const calendarReducer = (state=initialState,action ) => {
 switch(action.type){
        case types.calendar:
            return{
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,

            }
        default:
            return state
    }

};
