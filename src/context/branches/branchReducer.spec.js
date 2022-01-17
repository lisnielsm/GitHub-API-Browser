import {
    GET_BRANCHES,
    CHANGE_BRANCH,
    TOOGLE_BRANCHES,
    CLEAR_BRANCH
} from '../../types';

import branchReducer from './branchReducer';

const list = [
    {
        id: 1,
        commit: {
            sha: "123"
        }
    },
    {
        id: 1,
        commit: {
            sha: "456"
        }
    },
    {
        id: 1,
        commit: {
            sha: "789"
        }
    }
];

describe('Test the branch reducer', () => {
    test('should set the branches', () => {
        const state = { branches: [], currentBranch: null, isActive: false };
        const newState = branchReducer(state, {
            type: GET_BRANCHES,
            payload: list
        });

        expect(newState).toEqual({ branches: list, currentBranch: null, isActive: false });
    });

    test('should set the current branch', () => {
        const state = { branches: list, currentBranch: null, isActive: true };
        const newState = branchReducer(state, {
            type: CHANGE_BRANCH,
            payload: list[1].commit.sha
        });

        expect(newState).toEqual({ branches: list, currentBranch: list[1], isActive: true });
    });

    test('should activate the branches', () => {
        const state = { branches: list, currentBranch: null, isActive: false };
        const newState = branchReducer(state, {
            type: TOOGLE_BRANCHES,
            payload: true
        });

        expect(newState).toEqual({ branches: list, currentBranch: null, isActive: true });
    });

    test('should delete the branches, currentBranch and set isActive to false', () => {
        const state = { branches: list, currentBranch: list[0], isActive: true };
        const newState = branchReducer(state, {
            type: CLEAR_BRANCH
        });

        expect(newState).toEqual({ branches: [], currentBranch: null, isActive: false });
    });
});