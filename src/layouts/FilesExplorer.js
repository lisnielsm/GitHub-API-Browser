import React, { useContext } from 'react';

import FileContext from '../context/files/fileContext';
import FileList from '../components/files/FileList';


const FilesExplorer = () => {

    const fileContext = useContext(FileContext);
    const { files } = fileContext;

    return (
        <div className="div-main-file">
            <div className="title">Files Explorer</div>

            <div className="info-container">
                {files.length === 0 ? null : <FileList />}
            </div>

        </div>
    );
}

export default FilesExplorer;