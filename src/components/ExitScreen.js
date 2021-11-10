import React, { useState, useEffect } from "react";
import "./ExitScreen.css";
import { FirebaseStore } from "../helper/firestore.js";

var CoffeeGlyph = require("./assets/coffee_glyph_smaller.png");

/*
 * Subcomponents
 */

const Title = () => {
    return <h1> Thank you for placing your order!</h1>;
};

const Body = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const Glyphs = ({ amount }) => {
        if (amount > 5) {
            amount = 5;
        }
        var container = [];
        for (var i = 0; i < amount; ++i) {
            container.push(<img src={CoffeeGlyph} />);
        }
        return container;
    };

    useEffect(() => {
        (async () => {
            try {
                // set loading to true before calling API
                setLoading(true);
                const data = await gatherInformation();
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
    if (loading) return <span>Loading</span>;

    // data will be null when fetch call fails
    if (!data) return <span>Data not available</span>;

    var display_location = data.location.split(",")[0];
    var quantity = data.queue_position;

    return (
        <div id="information-container">
            <div>
                <p id="para">
                    You are number {quantity} in the queue! Your estimated wait
                    time is {quantity * 4} minutes at the {display_location}{" "}
                    location
                </p>
            </div>
            <Glyphs amount={quantity} />
        </div>
    );
};
/*
 * End subcomponents
 */

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
    return current_session;
}

export default function ExitScreen() {
    return (
        <div>
            <span id="login-background"></span>
            <Title />
            <Body />
        </div>
    );
}
