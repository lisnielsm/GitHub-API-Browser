import React, { useContext, useEffect, useReducer } from 'react';

import userContext from './userContext';
import userReducer from './userReducer';

import ErrorContext from '../errors/errorContext';
import SpinnerContext from '../spinner/spinnerContext';

import {
    GET_USERS,
    SET_USER
} from '../../types';

import clientAxios from '../../config/axios';

const UserState = props => {

    // get the error state
    const errorContext = useContext(ErrorContext);
    const { showError } = errorContext;

    // get the spinner state
    const spinnerContext = useContext(SpinnerContext);
    const { showSpinner } = spinnerContext;

    const initialState = {
        users: [],
        currentUser: null
    };

    useEffect(() => {
        getUsers();
    }, [])

    // Dispatch for execute actions
    const [state, dispatch] = useReducer(userReducer, initialState);

    // get the example users
    const getUsers = async () => {
        try {
            const response = await clientAxios.get('/users');

            dispatch({
                type: GET_USERS,
                payload: response.data
            });

        } catch (error) {
            console.log(error.response)
        }
    };

    // select the current user the user clicked
    const getUser = async username => {
        try {

            const response = await clientAxios.get(`/users/${username}`);

            setUser(response.data)

            return true;

        } catch (error) {
            console.log(error.response)

            showError("Invalid user name");
            showSpinner(false);

            return false;
        }
    };

    // set the current user
    const setUser = user => {
        try {

            dispatch({
                type: SET_USER,
                payload: user
            });

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <userContext.Provider
            value={{
                users: state.users,
                currentUser: state.currentUser,
                getUsers,
                getUser,
                setUser
            }}
        >
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;