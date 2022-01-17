import React, { useContext, useReducer } from 'react';

import fileContext from './fileContext';
import fileReducer from './fileReducer';

import {
    GET_FILES,
    CHANGE_FILE,
    GET_FILE_CONTENT,
    CLEAR_FILES
} from '../../types';

import clientAxios from '../../config/axios';

import ErrorContext from '../errors/errorContext';
import SpinnerContext from '../spinner/spinnerContext';

const FileState = props => {

    const initialState = {
        files: [],
        currentFile: null,
        currentFileContent: null,
    };

    // get the error state
    const errorContext = useContext(ErrorContext);
    const { showError } = errorContext;

    // get the spinner state
    const spinnerContext = useContext(SpinnerContext);
    const { showSpinner } = spinnerContext;

    // Dispatch para execute actions
    const [state, dispatch] = useReducer(fileReducer, initialState);

    // get the files associated with the current branch
    const getFiles = async (username, reponame, branchname) => {

        try {

            showSpinner(true);

            const response = await clientAxios.get(`/repos/${username}/${reponame}/git/trees/${branchname}?recursive=1`);

            dispatch({
                type: GET_FILES,
                payload: response.data.tree
            });

            showSpinner(false);

        } catch (error) {
            console.log(error.response)
        }
    };

    // select the current file that user clicked
    const changeFile = fileSha => {

        dispatch({
            type: CHANGE_FILE,
            payload: fileSha
        });
    };

    // get the file content that user clicked
    const getFileContent = async (username, reponame, filename) => {
        try {
            showSpinner(true);

            const response = await clientAxios.get(`/repos/${username}/${reponame}/contents/${filename}`);

            dispatch({
                type: GET_FILE_CONTENT,
                payload: atob(response.data.content)
            });

            showSpinner(false);

        } catch (error) {
            console.log(error.response)

            showError("File name doesn't found");

            showSpinner(false);
        }
    }

    // delete current Files
    const deleteFiles = () => {

        dispatch({
            type: CLEAR_FILES
        });
    };

    return (
        <fileContext.Provider
            value={{
                files: state.files,
                currentFile: state.currentFile,
                currentFileContent: state.currentFileContent,
                getFiles,
                changeFile,
                getFileContent,
                deleteFiles
            }}
        >
            {props.children}
        </fileContext.Provider>
    )
}

export default FileState;