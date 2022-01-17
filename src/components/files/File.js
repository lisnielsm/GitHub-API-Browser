import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import RepoContext from '../../context/repos/repoContext';
import UserContext from '../../context/users/userContext';
import FileContext from '../../context/files/fileContext';

const File = ({ file }) => {

    // get the repo state
    const repoContext = useContext(RepoContext);
    const { currentRepo } = repoContext;

    // get the current user
    const userContext = useContext(UserContext);
    const { currentUser } = userContext;

    // get the file state
    const fileContext = useContext(FileContext);
    const { changeFile, getFileContent } = fileContext;

    // add the current repo
    const selectFile = sha => {

        changeFile(sha);
        getFileContent(currentUser.login, currentRepo.name, file.path);  // get the content of the file clicked
    }

    const onButtonClick = e => {
        const elemList = document.querySelectorAll(".fileBtn");

        elemList.forEach(elem => {
            elem.classList.remove("button-selected");
        });

        e.target.classList.add("button-selected");

        selectFile(file.sha);
    }

    return (
        <li>
            <button
                type="button"
                className="btn fileBtn"
                onClick={onButtonClick}
            >{file.path}</button>
        </li>
    );
}

File.propTypes = {
    file: PropTypes.object.isRequired
}

export default File;