import React from "react";

import "./Header.css";

export default function Header() {
    const onClick = (event) => {
        event.target.reset();
        console.log(event.target.name);
    };

    return (
        <header className="shadow-sm p-3 bg-white">
            <img src="./assets/logo.png" alt="Expresso" id="header-logo"></img>
            <div id="header-navbar">
                <button
                    className="header-nav-button navbar-toggler"
                    type="button"
                    name="menu"
                    onClick={onClick}
                >
                    Menu
                </button>
                <button
                    className="header-nav-button navbar-toggler"
                    type="button"
                    name="locations"
                    onClick={onClick}
                >
                    Locations
                </button>
                <button
                    className="header-nav-button navbar-toggler"
                    type="button"
                    name="cart"
                    onClick={onClick}
                >
                    Cart
                </button>
            </div>
        </header>
    );
}
