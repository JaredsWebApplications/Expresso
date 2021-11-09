import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

/*
 * Defined by us
 */

import Login from "./components/LoginPrompt.js"; // import function exports like this
import LocationSelectionMenu from "./components/LocationSelection.js";

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
