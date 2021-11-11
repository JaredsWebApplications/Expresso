import React from "react";

class ItemCard extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.description = props.description;
        this.imgSrc = props.imgSrc;

        this.OnUserClick = this.OnUserClick.bind(this);
    }

    OnUserClick(event) {
        console.log("user clicked on itemcard " + this.name);
    }

    render() {
        return (
            <div className="card shadow item-card" onClick={this.OnUserClick}>
                <img
                    src={"./assets/" + this.imgSrc}
                    className="card-img-top"
                    alt={this.name}
                />
                <div className="card-body">
                    <h5 className="card-title">{this.name}</h5>
                    <p className="card-text">{this.description}</p>
                </div>
            </div>
        );
    }
}

export default ItemCard;
