import React from "react";
import ItemCard from "./ItemCard.js";
import Header from "./DrinkSelectionHeader.js";
import DrinkSelectorPopup from "./DrinkSelectorPopup.js";

import "./DrinkSelector.css";

export default class DrinkSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = { popup: false, selectedCoffeeName: '' }

        this.popupDrinkCustomizer = this.popupDrinkCustomizer.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    popupDrinkCustomizer(coffeeName) {
        console.log("called popupDrinkCustomizer " + coffeeName);
        this.setState({ popup: true, selectedCoffeeName: coffeeName });
    }

    closePopup() {
        console.log("called closePopup");
        this.setState({ popup: false, selectedCoffeeName: '' });
    }

    render() {
        return (
            <div className="DrinkSelector">
                <Header />
                <div id="menu-container">
                    <h4>Coffees</h4>
                    <ItemCard name='Latte' imgSrc='latte.png' description='Rich espresso balanced with steamed milk and a light layer of foam.' PopupDrinkCustomizer={this.popupDrinkCustomizer} />
                    <ItemCard name='Cafe Mocha' imgSrc='cafe-mocha.png' description='Rich, full-bodied espresso combined with bittersweet mocha sauce and steamed milk, then topped with sweetened whipped cream.' PopupDrinkCustomizer={this.popupDrinkCustomizer} />
                    <ItemCard name='Caramel Macchiato' imgSrc='caramel-macchiato.png' description='Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with a caramel drizzle.' PopupDrinkCustomizer={this.popupDrinkCustomizer} />
                    <ItemCard name='White Chocolate Mocha' imgSrc='white-chocolate-mocha.png' description='Espresso meets white chocolate sauce and steamed milk, and then is finished off with sweetened whipped cream.' PopupDrinkCustomizer={this.popupDrinkCustomizer} />
                </div>
                {this.state.popup ? <DrinkSelectorPopup name={this.state.selectedCoffeeName} ClosePopup={this.closePopup}/> : ""}
            </div>
        );
    }
}
