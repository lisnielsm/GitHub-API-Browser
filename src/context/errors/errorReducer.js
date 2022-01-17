import {
    SHOW_ERROR,
    HIDE_ERROR
} from "../../types";

const ErrorReducer = (state, action) => {
    switch (action.type) {
        case SHOW_ERROR:
            return {
                error: action.payload
            }
        case HIDE_ERROR:
            return {
                error: null
            }
        default:
            return state;
    }
};

export default ErrorReducer;