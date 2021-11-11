import React from "react";
import "./Header.css";

export default function Header() {
    const onSubmit = (event) => {
        console.log(event.target.name);
    };

    return (
        <header id="div-header" className="shadow-sm p-3 bg-white">
            <img src="./assets/logo.png" alt="Expresso" id="header-logo"></img>
            <div id="header-navbar">
                <button
                    className="header-nav-button navbar-toggler"
                    type="button"
                    name="menu"
                    onClick={onSubmit}
                >
                    Menu
                </button>
                <button
                    className="header-nav-button navbar-toggler"
                    type="button"
                    name="locations"
                    onClick={onSubmit}
                >
                    Locations
                </button>
                <button
                    className="header-nav-button navbar-toggler"
                    type="button"
                    name="cart"
                    onClick={onSubmit}
                >
                    Cart
                </button>
            </div>
        </header>
    );
}
