import {types} from '../types/types'

export const aFavorite = (state) => {
    return {
        type: types.favorite,
        payload: {
           state
        },
    }; 
}
