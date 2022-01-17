import {
    SHOW_SPINNER
} from "../../types";

const spinnerReducer = (state, action) => {
    switch (action.type) {
        case SHOW_SPINNER:
            return {
                ...state,
                load: action.payload
            }
        default:
            return state;
    }
}

export default spinnerReducer;