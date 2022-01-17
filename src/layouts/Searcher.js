import React, { useState, useContext, useEffect } from 'react';

import RepoContext from '../context/repos/repoContext';
import UserContext from '../context/users/userContext';
import BranchContext from '../context/branches/branchContext';
import FileContext from '../context/files/fileContext';
import ErrorContext from '../context/errors/errorContext';

const Searcher = () => {

    const repoContext = useContext(RepoContext);
    const { getRepos } = repoContext;

    const userContext = useContext(UserContext);
    const { users, getUser } = userContext;

    const branchContext = useContext(BranchContext);
    const { deleteBranches } = branchContext;

    const fileContext = useContext(FileContext);
    const { deleteFiles } = fileContext;

    const errorContext = useContext(ErrorContext);
    const { showError } = errorContext;

    const [username, setUserName] = useState('');
    const [tempusername, setTempUserName] = useState('');
    const [isready, setIsReady] = useState(false);

    useEffect(() => {

        if (!isready) return;

        // if user is valid then we fetch his/her repos
        if (getUser(username)) {
            getRepos(username);
        }

        setIsReady(false);

        deleteBranches();
        deleteFiles();

        // eslint-disable-next-line
    }, [username])

    const searchUser = e => {
        e.preventDefault();

        // validate 
        if (tempusername.trim() === '') {
            showError("User name cannot be empty");
            return;
        }

        setIsReady(true);
        setUserName(tempusername);

        const elem = document.querySelector(".user-select");
        elem.value = "";
    }

    const changeUser = username => {
        setIsReady(true);
        setUserName(username);
        setTempUserName(username);
    }

    return (
        <form
            onSubmit={searchUser}
        >
            <div className="row mx-0">
                <div className="col-12 col-sm-7 offset-sm-2">
                    <div className="d-flex flex-column justify-content-end align-items-center w-100">
                        <label className="mb-2">Please type a username to search</label>
                        <input
                            type="text"
                            className="form-control form-control-md mb-2 mb-sm-0"
                            placeholder="Please type a user name"
                            value={tempusername}
                            onChange={e => setTempUserName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-12 col-sm-3 d-flex justify-content-center align-items-end">
                    <input
                        type="submit"
                        className="btn btn-md btn-danger btn-block w-100"
                        value="Search"
                    />
                </div>

                <div className="col-12 col-sm-9 mt-2">
                    <div className="d-flex flex-column flex-sm-row justify-content-end align-items-center w-100">
                        <label className="mb-2 pe-2">Users examples: </label>
                        <select
                            name="username"
                            className="form-control user-select"
                            // value={state}
                            onChange={e => changeUser(e.target.value)}
                        >
                            <option value="">Select username</option>

                            {users.map((user) => {
                                return (
                                    <option
                                        key={user.id}
                                        value={user.login}>
                                        {user.login}
                                    </option>);
                            })}

                        </select>
                    </div>
                </div>
            </div>
        </form>

    );
}

export default Searcher;