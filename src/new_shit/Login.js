import "./login.css";
import React from "react";
import DataStore from "./datastore";
import { FirebaseStore } from "../helper/firestore.js";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: "",
        };

        this.info = { emailAddress: "", password: "" };

        this.db = new FirebaseStore("");

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    handleFieldChange(event) {
        switch (event.target.id) {
            case "user-email":
                this.info.emailAddress = event.target.value;
                break;
            case "user-pwd":
                this.info.password = event.target.value;
                break;
            default:
                break;
        }
    }

    async handleLoginSubmit(event) {
        event.preventDefault();

        var value = await datastore.get(
            this.info.emailAddress,
            "users",
            "emailAddress"
        );
        value = value[0].data().value; // this sucks but is the only way
        if (value.length == 0) {
            alert(`cannot find the email address of ${emailAddress}`);
        } else {
            if (value.password !== password) {
                alert(`Cannot authenticate ${emailAddress}! Try again!`);
            } else {
                await datastore.update(
                    {
                        emailAddress: emailAddress,
                    },
                    "sessions",
                    "session_id_1"
                );
                this.props.history.push({
                    pathname: "/locations",
                    state: {
                        response: "hey mom, no hands!",
                        value: emailAddress,
                    },
                });
            }
        }

        //await this.db.get(this.info.emailAddress).then(
        //function (value) {
        //if (value === undefined) {
        //this.setState({ errorMessage: "Invalid email address." });
        //} else {
        ////event.target.reset();

        //if (this.info.password === value) {
        //// https://stackoverflow.com/questions/59402649/how-can-i-use-history-pushpath-in-react-router-5-1-2-in-stateful-component
        //this.props.history.push("/menu");
        //} else {
        //this.setState({ errorMessage: "Incorrect password." });
        //}
        //}
        //}.bind(this)
        //);
    }

    render() {
        return (
            <div className="Login">
                <span id="login-background"></span>
                <div id="login-container">
                    <img
                        src={"./assets/logo.png"}
                        id="login-logo"
                        alt="Login Logo"
                    />
                    <form id="login-form" onSubmit={this.handleLoginSubmit}>
                        <span id="login-error-text">
                            {this.state.errorMessage}
                        </span>
                        <input
                            type="email"
                            className="form-control"
                            id="user-email"
                            placeholder="Email"
                            required
                            onChange={this.handleFieldChange}
                        />
                        <input
                            type="password"
                            className="form-control"
                            id="user-pwd"
                            placeholder="Password"
                            required
                            onChange={this.handleFieldChange}
                        />
                        <input
                            className="btn btn-primary"
                            id="login-button"
                            type="submit"
                            value="Login"
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
