import {
    SHOW_SPINNER
} from "../../types";

import spinnerReducer from './spinnerReducer';

describe('Test the spinner reducer', () => {
    test('should set the spinner load to true', () => {
        const state = { load: false };
        const newState = spinnerReducer(state, {
            type: SHOW_SPINNER,
            payload: true
        });

        expect(newState).toEqual({ load: true });
    });

    test('should set the spinner load to false', () => {
        const state = { load: true };
        const newState = spinnerReducer(state, {
            type: SHOW_SPINNER,
            payload: false
        });

        expect(newState).toEqual({ load: false });
    });
});