import React, { useContext } from "react";

import Searcher from '../layouts/Searcher';
import ReposExplorer from '../layouts/ReposExplorer';
import FilesExplorer from '../layouts/FilesExplorer';
import CodeInspector from '../layouts/CodeInspector';
import Branches from "../layouts/Branches";
import Spinner from '../components/spinner/Spinner';

import ErrorContext from "../context/errors/errorContext";
import SpinnerContext from "../context/spinner/spinnerContext";

import logo from "../Github-Logo-05.png";

import tokenAuth from '../config/token';
import clientAxios from "../config/axios";

clientAxios.defaults.baseURL = 'https://api.github.com';

const token = process.env.REACT_APP_GHT;

if (token) {
    tokenAuth(token);
}

const MainContainer = () => {

    // get the error state
    const errorContext = useContext(ErrorContext);
    const { error } = errorContext;

    // get the spinner state
    const spinnerContext = useContext(SpinnerContext);
    const { load } = spinnerContext;

    return (
        <div className="App">
            <header className="App-header">
                <h2>GitHub API Browser</h2>
                <div>
                    <img className="github-logo" src={logo} alt="GitHub logo"></img>
                </div>
            </header>

            <main className="container" style={{ position: "relative" }}>

                <div className="div-spinner">
                    <div className="d-flex justify-content-center align-items-center w-100 h-100">
                        {load ? <Spinner /> : null}
                    </div>
                </div>

                <Searcher />

                {error ? <label className="custom-alert">{error}</label> : null}

                <div className="mt-4 w-100">
                    <div className="row mx-0">
                        <div className="col-12 col-sm-5 px-0 pe-sm-2 pb-3">
                            <div className="d-flex flex-column w-100">
                                <div className="mb-3">
                                    <ReposExplorer />
                                </div>

                                <div className="mb-3">
                                    <Branches />
                                </div>

                                <FilesExplorer />
                            </div>
                        </div>
                        <div className="col-12 col-sm-7 px-0 ps-sm-2 mb-3">
                            <CodeInspector />
                        </div>
                    </div>
                </div>

            </main>

            <footer className="footer">
                <div className="d-flex justify-content-center align-items-center">
                    <div><span>{'\u00A9'}</span> 2022 Lisniel Sánchez Morales</div>
                </div>
            </footer>

        </div>
    );
}

export default MainContainer;