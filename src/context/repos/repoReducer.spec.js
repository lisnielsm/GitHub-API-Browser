import {
    GET_REPOS,
    CHANGE_REPO,
    CLEAR_REPO
} from '../../types';

import repoReducer from './repoReducer';

const list = [
    {
        id: 1,
        name: "1"
    },
    {
        id: 2,
        name: "2"
    },
    {
        id: 3,
        name: "3"
    }
];

describe('Test the repo reducer', () => {
    test('should set the repos', () => {
        const state = { repos: [], currentRepo: null };
        const newState = repoReducer(state, {
            type: GET_REPOS,
            payload: list
        });

        expect(newState).toEqual({ repos: list, currentRepo: null });
    });

    test('should set the current repo', () => {
        const state = { repos: list, currentRepo: null };
        const newState = repoReducer(state, {
            type: CHANGE_REPO,
            payload: list[1].id
        });

        expect(newState).toEqual({ repos: list, currentRepo: list[1] });
    });

    test('should delete the repos and currentRepo', () => {
        const state = { repos: list, currentRepo: list[1] };
        const newState = repoReducer(state, {
            type: CLEAR_REPO
        });

        expect(newState).toEqual({ repos: [], currentRepo: null });
    });
});