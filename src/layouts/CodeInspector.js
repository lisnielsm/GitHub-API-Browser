import React, { useContext } from 'react';

import FileContext from '../context/files/fileContext';

const CodeInspector = () => {

    const fileContext = useContext(FileContext);
    const { currentFileContent } = fileContext;

    return (
        <div className="div-main-code">
            <div className="title">Code Inspector</div>

            <div className="code-container">
                {currentFileContent ?
                    <label>{currentFileContent}</label>
                    : null}
            </div>
        </div>
    );
}

export default CodeInspector;