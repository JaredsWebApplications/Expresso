import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./PaymentInput.css";
import { FirebaseStore } from "../helper/firestore.js";

async function gatherInformation() {
    var datastore = new FirebaseStore("");

    const value = await datastore.getAll("sessions");
    var current_session = {};

    value.forEach((doc) => {
        //const data = doc.data();
        const [document_id, data] = doc;
        if (document_id === "session_id_1") {
            current_session = data;
        }
    });
    return current_session.drink.price;
}
export default function PaymentInputScreen() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const history = useHistory();
    var datastore = new FirebaseStore("");

    var state = {};

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        (async () => {
            try {
                // set loading to true before calling API
                setLoading(true);
                const data = await gatherInformation();
                console.log(data);
                setData(data);
                // switch loading to false after fetch is complete
                setLoading(false);
            } catch (error) {
                // add error handling here
                setLoading(false);
                console.log(error);
            }
        })();
    }, []);

    // return a Spinner when loading is true
    if (loading) return <span>Loading</span>;

    // data will be null when fetch call fails
    if (!data) return <span>Data not available</span>;

    const onSubmit = (data, event) => {
        event.target.reset();
        data = Object.assign({}, data, state);

        (async () => {
            var payload = {
                card_number: data.credit_card_number,
                expiration_month: data.expiration_month,
                expiration_year: data.expiration_year,
                card_holder: data.card_holder_name,
            };
            await datastore.update(
                {
                    payment_information: {
                        payload,
                    },
                },
                "sessions",
                "session_id_1"
            );

            const value = await datastore.getAll("sessions");
            var current_session = {};

            value.forEach((doc) => {
                //const data = doc.data();
                const [document_id, data] = doc;
                if (document_id === "session_id_1") {
                    current_session = data;
                }
            });
            var current_location = current_session.location;

            const current_location_information = await datastore.filter(
                "locations",
                "address",
                current_location
            );
            var current_queue_length =
                current_location_information[0][1].queue_length;

            await datastore.update(
                {
                    queue_length: current_queue_length + 1,
                },
                "locations",
                current_location_information[0][0]
            );

            await datastore.update(
                {
                    queue_position: current_queue_length + 1,
                },
                "sessions",
                "session_id_1"
            );

            history.push({
                pathname: "/exit",
                state: {
                    response: "hey mom, no hands!",
                },
            });
        })();
    };

    return (
        <div>
            <h1>Payment Input</h1>
            <span id="container-background"></span>
            <div id="payment-input-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label for="ccn">Credit Card Number</label>
                        <input
                            id="ccn"
                            type="text"
                            {...register("credit_card_number", {
                                required: true,
                                pattern: /[0-9]{10}/,
                            })}
                        />
                        <div>
                            <label for="expir_mon">Valid Through</label>
                            <div id="expir_mon">
                                <Dropdown
                                    options={[
                                        // I hate that I did this
                                        "01",
                                        "02",
                                        "03",
                                        "04",
                                        "05",
                                        "06",
                                        "07",
                                        "08",
                                        "09",
                                        "10",
                                        "11",
                                        "12",
                                    ]}
                                    onChange={(event) => {
                                        state["expiration_month"] = event.value;
                                    }}
                                    value="MM"
                                />

                                <Dropdown
                                    options={[...Array(10).keys()].map(
                                        (i) => 2021 + i
                                    )}
                                    onChange={(event) => {
                                        state["expiration_year"] = event.value;
                                    }}
                                    value="YY"
                                />
                            </div>
                        </div>
                        <div>
                            <label for="ccv_message">CCV</label>
                            <div id="ccv_message">
                                <input
                                    type="text"
                                    {...register("ccv", {
                                        required: true,
                                        pattern: /[0-9]{3}/,
                                    })}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label for="card_hold">Card Holder's Name</label>
                        <input
                            id="card_hold"
                            type="text"
                            {...register("card_holder_name", {
                                required: true,
                                pattern: /[a-zA-Z\s]+/,
                            })}
                        />
                    </div>
                    <input
                        id="payment-button"
                        type="submit"
                        value={"Pay: $" + data}
                    ></input>
                </form>
            </div>
        </div>
    );
}
