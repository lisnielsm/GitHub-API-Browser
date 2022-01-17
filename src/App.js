import React from "react";
import "./App.css";

import MainContainer from "./components/MainContainer";

import RepoState from "./context/repos/repoState";
import BranchState from "./context/branches/branchState";
import UserState from "./context/users/userState";
import FileState from "./context/files/fileState";
import ErrorState from "./context/errors/errorState";
import SpinnerState from "./context/spinner/spinnerState";

function App() {
	return (
		<SpinnerState>
			<ErrorState>
				<UserState>
					<RepoState>
						<FileState>
							<BranchState>
								<MainContainer />
							</BranchState>
						</FileState>
					</RepoState>
				</UserState>
			</ErrorState>
		</SpinnerState>
	);
}

export default App;
