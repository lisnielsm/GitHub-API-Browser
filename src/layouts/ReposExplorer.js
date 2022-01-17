import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import ReposList from '../components/repos/ReposList';

const ReposExplorer = () => {
    return (
        <div className="div-main-project">
            <div className="title">Repos Explorer</div>
            <div className="info-container">
                <ReposList />
            </div>
        </div>
    );
}

export default ReposExplorer;