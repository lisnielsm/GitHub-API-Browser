import React, { useContext } from 'react';

import File from './File';
import FileContext from '../../context/files/fileContext';

const FileList = () => {

    // extract the files from initial state
    const fileContext = useContext(FileContext);
    const { files } = fileContext;

    // check if files if empty
    if (files.length === 0) return null;

    var id = 1;

    return (
        <ul className="files-list">

            {files.map(file => {
                id++;
                return (
                    <File
                        key={file.sha + id.toString()}
                        file={file}
                    />
                )
            })}
        </ul>
    );
}

export default FileList;