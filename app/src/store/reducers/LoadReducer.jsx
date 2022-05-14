import { SET_LOADING } from "../actions/LoadAction";

const INITIAL_STATE = {
    loading: false
}

export const LoadReducer = (state = INITIAL_STATE, action) =>{    
    switch(action.type){
        case SET_LOADING:        
        return {
            ...state,
            loading: action.payload
        };        
        default:
            return state;
    }
}