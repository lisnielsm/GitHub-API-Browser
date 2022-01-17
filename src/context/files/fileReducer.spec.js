import {
    GET_FILES,
    CHANGE_FILE,
    GET_FILE_CONTENT,
    CLEAR_FILES
} from '../../types';

import fileReducer from './fileReducer';

const list = [
    {
        id: 1,
        sha: "123"
    },
    {
        id: 1,
        sha: "456"
    },
    {
        id: 1,
        sha: "789"
    }
];

const text = "This is an example text code";

describe('Test the file reducer', () => {
    test('should set the files', () => {
        const state = { files: [], currentFile: null, currentFileContent: null };
        const newState = fileReducer(state, {
            type: GET_FILES,
            payload: list
        });

        expect(newState).toEqual({ files: list, currentFile: null, currentFileContent: null });
    });

    test('should change the current file', () => {
        const state = { files: list, currentFile: null, currentFileContent: null };
        const newState = fileReducer(state, {
            type: CHANGE_FILE,
            payload: list[1].sha
        });

        expect(newState).toEqual({ files: list, currentFile: list[1], currentFileContent: null });
    });

    test('should get the file content', () => {
        const state = { files: list, currentFile: list[1], currentFileContent: null };
        const newState = fileReducer(state, {
            type: GET_FILE_CONTENT,
            payload: text
        });

        expect(newState).toEqual({ files: list, currentFile: list[1], currentFileContent: text });
    });

    test('should delete the files, currentFile and currentFileContent', () => {
        const state = { files: list, currentFile: list[0], currentFileContent: text };
        const newState = fileReducer(state, {
            type: CLEAR_FILES
        });

        expect(newState).toEqual({ files: [], currentFile: null, currentFileContent: null });
    });
});