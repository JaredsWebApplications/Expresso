import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

/*
 * Defined by us
 */

import Login from "./components/LoginPrompt.js"; // import function exports like this

//import Landing from "./components/Landing.js";
//import PaymentSelectionScreen from "./components/PaymentSelection.js";
//import PaymentInputScreen from "./components/PaymentInput.js";
import LocationSelectionMenu from "./components/LocationSelection.js";
//import ExitScreen from "./components/ExitScreen.js";

import "./styles.css";
// This should appear in the repo
// Push this to the test branch

// you must define the paths here in main
// a lot like routes.py in Flask
// NOTE: current approach does NOT protect against unauthorized redirects
// beyond the scope of this section at the moment, will lookn into later

//<Route exact path="/exit" component={ExitScreen} />
//<Route exact path="/landing" component={Landing} />
//<Route
//exact
//path="/locations"
//component={LocationSelectionMenu}
///>
//<Route
//exact
//path="/paymentselection"
//component={PaymentSelectionScreen}
///>
//<Route
//exact
//path="/paymentinput"
//component={PaymentInputScreen}
///>

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
                                path="/locations"
                                component={LocationSelectionMenu}
                            />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
