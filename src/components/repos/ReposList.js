import React, { useContext } from 'react';

import Repo from './Repo';
import RepoContext from '../../context/repos/repoContext';

const ReposList = () => {

    // extract the repos from initial state
    const repoContext = useContext(RepoContext);
    const { repos } = repoContext;

    // check if repos if empty
    if (repos.length === 0) return null;

    return (
        <ul className="repos-list">

            {repos.map(repo => (
                <Repo
                    key={repo.id}
                    repo={repo}
                />
            ))}
        </ul>
    );
}

export default ReposList;