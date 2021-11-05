import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

// VISA glyph?
//
export default function PaymentInputScreen() {
    const history = useHistory();

    var state = {};

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data, event) => {
        history.push({
            pathname: "/landing", // this should go to the next screen, which is filling out information regardnig the payment
            state: {
                response: "hey mom, no hands!",
                data: Object.assign({}, data, state), // pass this to the next page
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
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
                </div>
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
                            options={[...Array(10).keys()].map((i) => 2021 + i)}
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
            <input type="submit" value="pay now" />
        </form>
    );
}
