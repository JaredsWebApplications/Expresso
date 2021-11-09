import React from "react";
import { useHistory } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { FirebaseStore } from "../helper/firestore.js";

import "./Login.css";

function Prompt() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const methods = useForm();

    const history = useHistory();
    var datastore = new FirebaseStore("");

    const onSubmit = (data, e) => {
        e.target.reset();
        const [emailAddress, password] = Object.values(data);
        (async () => {
            var value = await datastore.get(
                emailAddress,
                "users",
                "emailAddress"
            );
            console.log(value);
            value = value[0].data().value; // this sucks but is the only way
            if (value.length == 0) {
                alert(`cannot find the email address of ${emailAddress}`);

                reset({
                    emailAddress: "",
                    passwordProvided: "",
                });
            } else {
                if (value.password !== password) {
                    alert(`Cannot authenticate ${emailAddress}! Try again!`);
                    reset({
                        emailAddress: "",
                        passwordProvided: "",
                    });
                } else {
                    await datastore.update(
                        {
                            emailAddress: emailAddress,
                        },
                        "sessions",
                        "session_id_1"
                    );
                    history.push({
                        pathname: "/locations",
                        state: {
                            response: "hey mom, no hands!",
                            value: emailAddress,
                        },
                    });
                }
            }
        })();
    };

    return (
        <FormProvider {...methods}>
            <form id="login-form" handleSubmit={methods.onSubmit}>
                <input
                    type="email"
                    className="form-control"
                    id="user-email"
                    placeholder="Email"
                    {...register("emailAddress", {
                        required: true,
                        pattern: /.+@csu\.fullerton\.edu$/,
                    })}
                />
                <input
                    type="password"
                    className="form-control"
                    id="user-pwd"
                    placeholder="Password"
                    {...register("passwordProvided", {
                        required: true,
                        pattern: /.+@csu\.fullerton\.edu$/,
                    })}
                />
                <input type="submit" />
                <input
                    style={{ display: "block", marginTop: 20 }}
                    type="button"
                    onClick={() =>
                        reset({
                            emailAddress: "jareddyreson@csu.fullerton.edu",
                            passwordProvided: "1234",
                        })
                    }
                    value="Reset with values"
                />
            </form>
        </FormProvider>
    );
}

export default function Login() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    return (
        <div className="Login">
            <span id="login-background"></span>

            <div id="login-container">
                <img
                    src={"./assets/logo.png"}
                    id="login-logo"
                    alt="Login Logo"
                />
                <Prompt />
            </div>
        </div>
    );
}
