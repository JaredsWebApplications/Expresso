import "./Login.css";
import React from "react";
import { FirebaseStore } from "../helper/firestore.js";

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: "",
        };

        this.info = { emailAddress: "", password: "" };

        this.datastore = new FirebaseStore("");

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

        var value = await this.datastore.get(
            this.info.emailAddress,
            "users",
            "emailAddress"
        );
        value = value[0].data().value; // this sucks but is the only way
        if (value.length == 0) {
            alert(`cannot find the email address of ${this.info.emailAddress}`);
        } else {
            if (value.password !== this.info.password) {
                alert(
                    `Cannot authenticate ${this.info.emailAddress}! Try again!`
                );
            } else {
                await this.datastore.update(
                    {
                        emailAddress: this.info.emailAddress,
                    },
                    "sessions",
                    "session_id_1"
                );
                this.props.history.push({
                    pathname: "/locations",
                    state: {
                        response: "hey mom, no hands!",
                    },
                });
            }
        }
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
