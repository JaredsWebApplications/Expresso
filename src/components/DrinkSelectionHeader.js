import React from "react";
import { withRouter } from 'react-router-dom';
import "./DrinkSelectionHeader.css";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        console.log("clicked header button " + event.target.name);
        this.props.history.push('/' + event.target.name);
    }

    render() {
        return (
            <header className="shadow-sm p-3 bg-white">
                <img src="./assets/logo.png" alt="Expresso" id="header-logo"></img>
                <div id="header-navbar">
                    <button
                        className="header-nav-button navbar-toggler"
                        type="button"
                        name="locations"
                        onClick={this.onClick}
                    >
                        Locations
                    </button>
                </div>
            </header>
        );
    }
}

export default withRouter(Header);
