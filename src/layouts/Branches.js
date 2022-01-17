import React, { useContext } from 'react';

import BranchContext from '../context/branches/branchContext';
import FileContext from '../context/files/fileContext';

const Branches = () => {

    const branchContext = useContext(BranchContext);
    const { branches, isActive, changeBranch } = branchContext;

    const fileContext = useContext(FileContext);
    const { deleteFiles } = fileContext;

    const changeCurrentBranch = branchname => {

        deleteFiles();

        const branch = branches.filter(branch => branch.name === branchname)

        changeBranch(branch[0]);
    }

    var id = 1;

    return (
        <select
            name="branches"
            className="form-control w-100"
            onChange={e => changeCurrentBranch(e.target.value)}
            style={isActive ? {} : { pointerEvents: "none", opacity: "0.4" }}
        >
            <option value="">--Select a branch--</option>

            {branches.map((branch) => {
                return (
                    <option
                        key={branch.commit.sha + (id++).toString()}
                        value={branch.name}>
                        {branch.name}
                    </option>);
            })}
        </select>
    );
}

export default Branches;