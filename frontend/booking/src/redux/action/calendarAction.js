import {types} from '../types/types'

export const aCalendar = (startDate, endDate) => {
    return {
        type: types.calendar,
        payload: {
            startDate,
            endDate,
        },
    };
}