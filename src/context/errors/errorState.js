import React, { useReducer } from 'react';
import errorReducer from './errorReducer';
import errorContext from './errorContext';

import {
    SHOW_ERROR,
    HIDE_ERROR
} from "../../types";

const ErrorState = props => {

    const initialState = {
        error: null
    }

    // dispatch to execute actions
    const [state, dispatch] = useReducer(errorReducer, initialState);

    // functions
    const showError = (msg) => {

        dispatch({
            type: SHOW_ERROR,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: HIDE_ERROR
            });
        }, 5000);
    };

    return (

        <errorContext.Provider
            value={{
                error: state.error,
                showError
            }}
        >
            {props.children}
        </errorContext.Provider>

    );
}

export default ErrorState;