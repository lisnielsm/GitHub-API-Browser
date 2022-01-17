import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import RepoContext from '../../context/repos/repoContext';
import BranchContext from '../../context/branches/branchContext';
import UserContext from '../../context/users/userContext';
import FileContext from '../../context/files/fileContext';
import SpinnerContext from '../../context/spinner/spinnerContext';

const Repo = ({ repo }) => {

    // get the repo state
    const repoContext = useContext(RepoContext);
    const { changeRepo } = repoContext;

    // get the getBranches function
    const branchContext = useContext(BranchContext);
    const { getBranches, toogleBranches } = branchContext;

    const fileContext = useContext(FileContext);
    const { deleteFiles } = fileContext;

    // get the current user
    const userContext = useContext(UserContext);
    const { currentUser } = userContext;

    // get the spinner state
    const spinnerContext = useContext(SpinnerContext);
    const { showSpinner } = spinnerContext;

    // add the current repo
    const selectRepo = id => {
        changeRepo(id);
        getBranches(currentUser.login, repo.name);  // get the new branches when a new repo is clicked
        toogleBranches(true);
        deleteFiles();
    }

    const onButtonClick = e => {
        showSpinner(true);

        const elemList = document.querySelectorAll(".repoBtn");

        elemList.forEach(elem => {
            elem.classList.remove("button-selected");
        });

        e.target.classList.add("button-selected");

        selectRepo(repo.id);

        showSpinner(false);
    }

    return (
        <li>
            <button
                type="button"
                className="btn py-1 repoBtn"
                onClick={onButtonClick}
            >{repo.name}</button>
        </li>
    );
}

Repo.propTypes = {
    repo: PropTypes.object.isRequired
}

export default Repo;