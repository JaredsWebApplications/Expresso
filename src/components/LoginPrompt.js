import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FirebaseStore } from "../helper/firestore.js";

import "../styles.css";

export default function Login() {
    const history = useHistory();
    var datastore = new FirebaseStore("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data, e) => {
        e.target.reset();
        // This will transition us into the next React component
        // https://stackoverflow.com/questions/60516300/how-to-use-in-reactjs-functional-component-history-push
        // Thank you StackOverflow, I am forver in debt to you

        const [emailAddress, password] = Object.values(data);
        // NOTE: this is how you add USERS | IE a sign up feature

        // datastore.add(
        // { emailAddress: emailAddress, password: password },
        // "users"
        // );

        // Obtain all users

        // (async () => {
        //   console.log(await datastore.getAll("users"));
        // })();

        // Obtain all users based on an attribute

        //(async () => {
        //  console.log(await datastore.get(emailAddress, "users", "emailAddress"));
        //})();

        // README: THIS WORKS
        (async () => {
            var value = await datastore.get(
                emailAddress,
                "users",
                "emailAddress"
            );
            console.log(value);
            value = value[0].data().value; // this sucks but is the only way
            if (value.length === 0) {
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
    // This takes place of the render function

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email Address</label>
                <input
                    type="text"
                    {...register("emailAddress", {
                        required: true,
                        pattern: /.+@csu\.fullerton\.edu$/,
                    })}
                />
                {errors.emailAddress && <p>This is required</p>}

                <label>Password</label>
                <input
                    type="text"
                    {...register("passwordProvided", { required: true })}
                />
                {errors.passwordProvided && <p>This is required</p>}

                <input type="submit" />
                <input
                    style={{ display: "block", marginTop: 20 }}
                    type="reset"
                    value="Standard Reset Field Values"
                />
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
        </div>
    );
}
