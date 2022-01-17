import {
    GET_REPOS,
    CHANGE_REPO,
    CLEAR_REPO
} from '../../types';

const repoReducer = (state, action) => {
    switch (action.type) {
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload
            }
        case CHANGE_REPO:
            return {
                ...state,
                currentRepo: state.repos.filter(repo => repo.id === action.payload)[0]
            }
        case CLEAR_REPO:
            return {
                ...state,
                repos: [],
                currentRepo: null
            }
        default:
            return state;
    }
}

export default repoReducer;