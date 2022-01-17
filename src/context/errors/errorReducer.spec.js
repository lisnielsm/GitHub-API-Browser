import {
    SHOW_ERROR,
    HIDE_ERROR
} from "../../types";

const errorText = "This is an error text";

import errorReducer from './errorReducer';

describe('Test the error reducer', () => {
    test('should set the error', () => {
        const state = { error: null };
        const newState = errorReducer(state, {
            type: SHOW_ERROR,
            payload: errorText
        });

        expect(newState).toEqual({ error: errorText });
    });

    test('should delete the current error', () => {
        const state = { error: errorText };
        const newState = errorReducer(state, {
            type: HIDE_ERROR
        });

        expect(newState).toEqual({ error: null });
    });
});