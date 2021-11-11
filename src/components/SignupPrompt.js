import "./Signup.css";
import React from "react";
import { FirebaseStore } from "../helper/firestore.js";

export default class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: "",
        };

        this.info = { emailAddress: "", password: "" };

        this.datastore = new FirebaseStore("");

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
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

    async handleSignupSubmit(event) {
        event.preventDefault();

        var obtained = await this.datastore.filter(
            "users",
            "emailAddress",
            this.info.emailAddress
        );
        if (!(obtained === undefined || obtained.length == 0)) {
            alert(
                `email address ${this.info.emailAddress} has already been taken!`
            );
            this.props.history.push({
                pathname: "/",
                state: {
                    response: "hey mom, no hands!",
                },
            });
            return;
        }
        await this.datastore.add(
            {
                emailAddress: this.info.emailAddress,
                password: this.info.password,
            },
            "users"
        );

        this.props.history.push({
            pathname: "/",
            state: {
                response: "hey mom, no hands!",
            },
        });
    }

    render() {
        return (
            <div className="Signup">
                <span id="signup-background"></span>
                <div id="signup-container">
                    <img
                        src={"./assets/logo.png"}
                        id="signup-logo"
                        alt="signup Logo"
                    />
                    <form id="signup-form" onSubmit={this.handleSignupSubmit}>
                        <span id="signup-error-text">
                            {this.state.errorMessage}
                        </span>
                        <input
                            type="firstname"
                            className="form-control"
                            id="user-email"
                            placeholder="First Name"
                            required
                            onChange={this.handleFieldChange}
                        />
                        <input
                            type="lastname"
                            className="form-control"
                            id="user-email"
                            placeholder="Last Name"
                            required
                            onChange={this.handleFieldChange}
                        />
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
                            id="signup-button"
                            type="submit"
                            value="Signup"
                        />
                    </form>
                </div>
            </div>
        );
    }
}
