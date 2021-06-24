import React, { useState, useEffect, useRef } from "react";
import Card from './Card';

import axios from "axios";





const DeckOfCards = () => {
    const [ cards, setCards ] = useState([]);
    const deckId = useRef();

    useEffect( () => {
        axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
            .then((res) => deckId.current = res.data['deck_id'])
            .catch((err) => console.error(err));
    }, []);

    const drawCard = () => {
        axios.get(`https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`)
            .then((res) => setCards(oldCards => [...oldCards, res.data.cards[0]]))
            .catch((err) => alert(err));
    };
    const cardsLeft = () => cards.length - 52;

    return (
        <div>
            { cardsLeft() !== 0 &&
                <button onClick={drawCard}>Draw</button>
            }
            
            { cards.length !== 0 && 
                <Card card={cards[cards.length - 1]} 
            /> }
        </div>
    );
};

export default DeckOfCards