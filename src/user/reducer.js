import {GET_ALL_USERS,GET_ALL_USERS_SUCCESS,GET_ALL_USERS_FAILURE} from './action'




const initialState = {
    data: [],
}

const reducer = ({state = initialState, action}) => {
    switch(action.type){
        case GET_ALL_USERS:
            return {
                ...state,
                data: action,
            }
        default :
            return state;
    }
    

}

export default {reducer};