import React, { useContext, useReducer } from 'react';

import repoContext from './repoContext';
import repoReducer from './repoReducer';
import SpinnerContext from '../spinner/spinnerContext';

import {
    GET_REPOS,
    CHANGE_REPO,
    CLEAR_REPO
} from '../../types';

import clientAxios from '../../config/axios';

const RepoState = props => {

    const initialState = {
        repos: [],
        currentRepo: null
    };

    // get the spinner state
    const spinnerContext = useContext(SpinnerContext);
    const { showSpinner } = spinnerContext;

    // Dispatch para execute actions
    const [state, dispatch] = useReducer(repoReducer, initialState);

    // get the repos
    const getRepos = async (username) => {

        try {

            showSpinner(true);

            const response = await clientAxios.get(`/users/${username}/repos?per_page=100`);

            let repos = [];
            let tempRepos = [];

            tempRepos = response.data;

            // need pagination
            if (response.headers.link) {
                let totalPages = parseInt(response.headers.link.substr(response.headers.link.lastIndexOf("&page=") + 6, 1));

                for (let i = 2; i <= totalPages; i++) {
                    const res = await clientAxios.get(`/users/${username}/repos?per_page=100&page=${i}`);
                    tempRepos = tempRepos.concat(res.data);
                }
            }

            tempRepos.forEach(element => {

                // Only save the public repositories
                if (element.visibility === 'public') {
                    repos.push(element);
                }
            });

            dispatch({
                type: GET_REPOS,
                payload: repos
            });

            showSpinner(false);

        } catch (error) {
            console.log(error.response)
        }
    };

    // select the current repo the user clicked
    const changeRepo = repoId => {

        dispatch({
            type: CHANGE_REPO,
            payload: repoId
        });
    };

    // delete current repo
    const deleteRepos = () => {

        dispatch({
            type: CLEAR_REPO
        });
    };

    return (
        <repoContext.Provider
            value={{
                repos: state.repos,
                currentRepo: state.currentRepo,
                getRepos,
                changeRepo,
                deleteRepos
            }}
        >
            {props.children}
        </repoContext.Provider>
    )
}

export default RepoState;