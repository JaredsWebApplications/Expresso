import React from "react";
import { useForm } from "react-hook-form";
import Header from "./DrinkSelectionHeader.js";

export default function DrinkSelector() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data, event) => {
        event.target.reset();

        console.log(data);
    };

    return <Header />;
}
