import {
    GET_BRANCHES,
    CHANGE_BRANCH,
    TOOGLE_BRANCHES,
    CLEAR_BRANCH
} from '../../types';

const branchReducer = (state, action) => {
    switch (action.type) {
        case GET_BRANCHES:
            return {
                ...state,
                branches: action.payload
            }
        case CHANGE_BRANCH:
            return {
                ...state,
                currentBranch: state.branches.filter(branch => branch.commit.sha === action.payload)[0]
            }
        case TOOGLE_BRANCHES:
            return {
                ...state,
                isActive: action.payload
            }
        case CLEAR_BRANCH:
            return {
                ...state,
                branches: [],
                currentBranch: null,
                isActive: false
            }
        default:
            return state;
    }
}

export default branchReducer;