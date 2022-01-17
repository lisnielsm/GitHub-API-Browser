import React, { useReducer } from 'react';
import SpinnerReducer from './spinnerReducer';
import spinnerContext from './spinnerContext';

import {
    SHOW_SPINNER
} from "../../types";

const SpinnerState = props => {

    const initialState = {
        load: false
    }

    // dispatch to execute actions
    const [state, dispatch] = useReducer(SpinnerReducer, initialState);

    // functions
    const showSpinner = (loading) => {

        dispatch({
            type: SHOW_SPINNER,
            payload: loading
        });
    };

    return (

        <spinnerContext.Provider
            value={{
                load: state.load,
                showSpinner
            }}
        >
            {props.children}
        </spinnerContext.Provider>

    );
}

export default SpinnerState;