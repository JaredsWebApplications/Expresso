// https://www.youtube.com/watch?v=i8fAO_zyFAM

import React from "react";
import { withRouter } from "react-router-dom";
import "./DrinkSelectorPopup.css";
import "../helper/firestore.js";
import { FirebaseStore } from "../helper/firestore.js";

class DrinkSelectorPopup extends React.Component {
    constructor(props) {
        super(props);

        this.info = {
            name: this.props.name,
            isIced: false,
            sugarAmount: 15,
            cupSize: "Small",
        };
        this.price_map = {
            Latte: 4.5,
            "Cafe Mocha": 3.0,
            "Caramel Macchiato": 3.5,
            "White Chocolate Mocha": 3.5,
        };
        this.size_modifier = {
            Small: 0.25,
            Medium: 0.5,
            Large: 0.75,
        };

        this.state = {
            triggered: false,
            sugarAmount: this.info.sugarAmount,
        };

        this.handleChange = this.handleChange.bind(this);
        //this.AddToCart = this.AddToCart.bind(this);
        this.Purchase = this.Purchase.bind(this);
        this.database = new FirebaseStore("");
    }

    handleChange(e) {
        let obj = {};
        obj[e.target.name] = e.target.value;
        this.info[e.target.name] = e.target.value;
        this.setState(obj);
        //console.log(e.target.name + " " + e.target.value);
    }

    /*AddToCart() {
        console.log(`added selected item to cart:\n
        name: ${this.info.name}
        isIced: ${this.info.isIced}
        sugarAmount: ${this.info.sugarAmount}
        cupSize: ${this.info.cupSize}
        `);

        // TODO: either do single item customization and purchase and just forget about cart functionality, or add to cart?
        // for adding to cart:
        // firestore store to collections 'cart'
        // clicking on the cart header button (in DrinkSelectionHeader.js) will-
        // retrieve the document, from the cart collection, of that user via session id key?

        this.props.ClosePopup()
    }*/
    async Purchase() {
        this.info.price = this.price_map[this.info.name];
        this.info.price += this.size_modifier[this.info.cupSize];
        console.log(this.info.price);

        await this.database.add(this.info, "orders");
        await this.database.update(
            {
                drink: this.info,
            },
            "sessions",
            "session_id_1"
        );

        this.props.history.push("/paymentselection");

        this.props.ClosePopup();
    }

    render() {
        return (
            <div className="DrinkSelectorPopup">
                <div className="dsc-popup">
                    <div className="dsc-popup-inner">
                        <button
                            className="btn btn-danger dsc-popup-close-btn"
                            onClick={this.props.ClosePopup}
                        >
                            Close
                        </button>
                        <div>
                            <h6>Drink: {this.info.name}</h6>

                            <br />

                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="isIced"
                                checked={this.state.check}
                                onChange={(e) => {
                                    this.handleChange({
                                        target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                        },
                                    });
                                }}
                            />
                            <label>&nbsp;Iced</label>

                            <br />
                            <br />

                            <label>Sugar (grams)</label>
                            <input
                                type="range"
                                className="form-range"
                                min="0"
                                max="50"
                                value={this.state.sugarAmount}
                                name="sugarAmount"
                                onChange={(e) => {
                                    this.handleChange(e);
                                }}
                            />
                            <label>{this.state.sugarAmount} g</label>

                            <br />
                            <br />

                            <div>
                                <span>Cup Size:</span>&nbsp;
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="cupSize"
                                    value="Big"
                                    onChange={(e) => {
                                        this.handleChange(e);
                                    }}
                                />
                                <label>Big</label>&nbsp;
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="cupSize"
                                    value="Medium"
                                    onChange={(e) => {
                                        this.handleChange(e);
                                    }}
                                />
                                <label>Medium</label>&nbsp;
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name="cupSize"
                                    value="Small"
                                    defaultChecked
                                    onChange={(e) => {
                                        this.handleChange(e);
                                    }}
                                />
                                <label>Small</label>&nbsp;
                            </div>
                            <br />
                            <button
                                className="btn btn-success"
                                onClick={this.Purchase}
                            >
                                Purchase
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(DrinkSelectorPopup);
