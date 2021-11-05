import React, { useState, useEffect } from "react"; // importing useEffect here

import { useHistory } from "react-router-dom"; // needs to redirect to the drink selector
import { useForm } from "react-hook-form";
import { Location } from "../helper/location.js";
import { FirebaseStore } from "../helper/firestore.js";

async function gatherInformation() {
    var container = [];
    var datastore = new FirebaseStore("");

    var locations = await datastore.getAll("locations");
    locations.forEach((document) => {
        var sorted = Object.keys(document)
            .sort()
            .reduce(function (acc, key) {
                acc[key] = document[key];
                return acc;
            }, {});
        const [address, company, geolocation, queue_length] =
            Object.values(sorted);
        container.push(
            new Location(
                address,
                company,
                geolocation["_lat"],
                geolocation["_long"],
                queue_length
            )
        );
    });

    // https://stackoverflow.com/questions/15593850/sort-array-based-on-object-attribute-javascript
    // Thank you ^
    container.sort(function (a, b) {
        return a.queue_length > b.queue_length
            ? 1
            : b.queue_length > a.queue_length
            ? -1
            : 0;
    });
    return container;
}

/*
 * Sub components inside the LocationSelectionMenu
 */

const Title = () => (
    <h1>
        <b>Select Location</b>
    </h1>
);

const GatheredInformation = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    var datastore = new FirebaseStore("");
    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data, event) => {
        event.target.reset();
        (async () => {
            await datastore.update(
                {
                    location: data.location,
                },
                "sessions",
                "session_id_1"
            );

            history.push({
                pathname: "/",
                state: {
                    response: "hey mom, no hands!",
                },
            });
        })();
    };

    const Row = (packet) => (
        <div>
            <label for={packet.address}>{packet.address}</label>
            <div>
                <input
                    type="radio"
                    value={packet.address}
                    name="payment-type"
                    style={{ color: "white" }}
                    {...register("location", {
                        required: true,
                    })}
                />
            </div>
        </div>
    );
    // useEffect with an empty dependency array works the same way as componentDidMount

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

    // return a Spinner when loading is true
    if (loading) return <span>Loading</span>;

    // data will be null when fetch call fails
    if (!data) return <span>Data not available</span>;

    var rows = [];
    data.forEach((doc) => {
        rows.push(Row(doc));
    });

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ul>
                    <div>{rows}</div>
                </ul>
                <input type="submit" value="continue" />
            </form>
        </div>
    );
};

/*
 * Main component
 */

export default function LocationSelectionMenu() {
    // either acquire the locations in sorted order or do it in this function
    // this data will come from Firestore

    return (
        <div>
            <Title />
            <GatheredInformation />
        </div>
    );
}
