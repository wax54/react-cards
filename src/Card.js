import React from "react";

const Card = ({ card }) => (
    <img src={card.image} alt={card.code} />
);

export default Card