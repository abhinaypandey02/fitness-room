import React from 'react';
import {Texts} from "../../configs/texts";

function NavigationBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
            <div className="navbar-brand mx-3">{Texts.appName}</div>
            <button
                className="navbar-toggler"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <i className="fas fa-bars"/>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a href="#" className="nav-link active"> Sign In</a>
                    </li>
                </ul>
            </div>

        </nav>
    );
}

export default NavigationBar;