import React from "react";

import "./DrinkSelectionHeader.css";

export default function Header() {
    const onClick = (event) => {
        console.log("clicked header button " + event.target.name);
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
