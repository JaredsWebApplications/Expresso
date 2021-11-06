import React from 'react';
import './header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.OnUserClick = this.OnUserClick.bind(this);
    }

    OnUserClick(event) {
        console.log('user clicked header button ' + event.target.name);
    }
    
    render() {
        return (
            <header className='shadow-sm p-3 bg-white'>
                <img src='./assets/logo.png' alt='Expresso' id='header-logo'></img>
                <div id='header-navbar'>
                    <button className="header-nav-button navbar-toggler" type="button" name='menu' onClick={this.OnUserClick}>
                        Menu
                    </button>
                    <button className="header-nav-button navbar-toggler" type="button" name='locations' onClick={this.OnUserClick}>
                        Locations
                    </button>
                    <button className="header-nav-button navbar-toggler" type="button" name='cart' onClick={this.OnUserClick}>
                        Cart
                    </button>
                </div>
            </header>
        );
    }
}

export default Header;
