import React, { useContext, useReducer } from 'react';

import branchContext from './branchContext';
import branchReducer from './branchReducer';
import UserContext from '../../context/users/userContext';
import RepoContext from '../../context/repos/repoContext';
import FileContext from "../../context/files/fileContext";
import SpinnerContext from '../spinner/spinnerContext';

import {
    GET_BRANCHES,
    CHANGE_BRANCH,
    TOOGLE_BRANCHES,
    CLEAR_BRANCH
} from '../../types';

import clientAxios from '../../config/axios';

const BranchState = props => {

    const initialState = {
        branches: [],
        currentBranch: null,
        isActive: false
    };

    const userContext = useContext(UserContext);
    const { currentUser } = userContext;

    const repoContext = useContext(RepoContext);
    const { currentRepo } = repoContext;

    const fileContext = useContext(FileContext);
    const { getFiles } = fileContext;

    // get the spinner state
    const spinnerContext = useContext(SpinnerContext);
    const { showSpinner } = spinnerContext;

    // Dispatch para execute actions
    const [state, dispatch] = useReducer(branchReducer, initialState);

    // get the branches
    const getBranches = async (username, reponame) => {

        if (!username || !reponame) return;

        try {

            showSpinner(true);

            const response = await clientAxios.get(`/repos/${username}/${reponame}/branches`);

            dispatch({
                type: GET_BRANCHES,
                payload: response.data
            });

            showSpinner(false);

        } catch (error) {
            console.log(error.response)
        }
    };

    // select the current branch the user clicked
    const changeBranch = branch => {

        dispatch({
            type: CHANGE_BRANCH,
            payload: branch.commit.sha
        });

        // get the files from that branch
        getFiles(currentUser.login, currentRepo.name, branch.name)
    };

    // activate or deactivated branches 
    const toogleBranches = (activate) => {
        dispatch({
            type: TOOGLE_BRANCHES,
            payload: activate
        });
    }

    // delete current branch
    const deleteBranches = () => {

        dispatch({
            type: CLEAR_BRANCH
        });
    };

    return (
        <branchContext.Provider
            value={{
                branches: state.branches,
                currentBranch: state.currentBranch,
                isActive: state.isActive,
                getBranches,
                changeBranch,
                toogleBranches,
                deleteBranches
            }}
        >
            {props.children}
        </branchContext.Provider>
    )
}

export default BranchState;