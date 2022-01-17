import {
    GET_FILES,
    CHANGE_FILE,
    GET_FILE_CONTENT,
    CLEAR_FILES
} from '../../types';

const fileReducer = (state, action) => {
    switch (action.type) {
        case GET_FILES:
            return {
                ...state,
                files: action.payload
            }
        case CHANGE_FILE:
            return {
                ...state,
                currentFile: state.files.filter(file => file.sha === action.payload)[0]
            }
        case GET_FILE_CONTENT:
            return {
                ...state,
                currentFileContent: action.payload
            }
        case CLEAR_FILES:
            return {
                ...state,
                files: [],
                currentFile: null,
                currentFileContent: null
            }
        default:
            return state;
    }
}

export default fileReducer;