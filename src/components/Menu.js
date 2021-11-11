import React from "react";
import { useForm } from "react-hook-form";
import Header from "./DrinkSelectionHeader.js";
import ItemCard from "./ItemCard";

export default function DrinkSelector() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onClick = (event) => {
        console.log(event.target.name);
    };

    return (
        <div className="card">
            <img
                className="card-img-top"
                src="./assets/tea_glyph.jpg"
                alt="Card image cap"
            />
            <div className="card-body">
                <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                </p>
            </div>
        </div>
    );
}
