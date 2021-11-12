import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

/*
 * Defined by us
 */

import Login from "./components/LoginPrompt.js"; // import function exports like this
import Signup from "./components/SignupPrompt.js";

import LocationSelectionMenu from "./components/LocationSelection.js";
import PaymentSelectionScreen from "./components/PaymentSelection.js";
import PaymentInputScreen from "./components/PaymentInput.js";
import ExitScreen from "./components/ExitScreen.js";
import DrinkSelector from "./components/Menu.js";

import "./styles.css";

class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route
                                exact
                                path="/menu"
                                component={DrinkSelector}
                            />
                            <Route exact path="/exit" component={ExitScreen} />
                            <Route
                                exact
                                path="/locations"
                                component={LocationSelectionMenu}
                            />
                            <Route
                                exact
                                path="/paymentselection"
                                component={PaymentSelectionScreen}
                            />
                            <Route
                                exact
                                path="/paymentinput"
                                component={PaymentInputScreen}
                            />
                            <Route exact path="/signup" component={Signup} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
