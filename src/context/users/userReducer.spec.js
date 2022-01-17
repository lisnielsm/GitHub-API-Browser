import {
    GET_USERS,
    SET_USER
} from '../../types';

import userReducer from './userReducer';

const list = [
    {
        id: 1,
        name: "jonh"
    },
    {
        id: 2,
        name: "diana"
    },
    {
        id: 3,
        name: "steve"
    }
];

describe('Test the user reducer', () => {
    test('should set the users', () => {
        const state = { users: [], currentUser: null };
        const newState = userReducer(state, {
            type: GET_USERS,
            payload: list
        });

        expect(newState).toEqual({ users: list, currentUser: null });
    });

    test('should set the current user', () => {
        const state = { users: list, currentUser: null };
        const newState = userReducer(state, {
            type: SET_USER,
            payload: list[1]
        });

        expect(newState).toEqual({ users: list, currentUser: list[1] });
    });
});