import React, { useState, useEffect, useRef } from "react";
import Card from './Card';

import axios from "axios";

const DeckOfCards = () => {
    const DRAW_SPEED = 1000;
    const [ cards, setCards ] = useState([]);
    const [ drawingCards, setDrawingCards] = useState(false);
    const deckId = useRef();
    const cardDrawIntervalId = useRef();

    const toggleDrawingCards = () => {
        setDrawingCards(currState => !currState);
    };

    const cardsLeft = cards.length < 52;

    const drawCard = () => {
        axios.get(`https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`)
            .then((res) => {
                res.data.cards.length ?
                    setCards(oldCards => [...oldCards, res.data.cards[0]])
                    : clearInterval(cardDrawIntervalId.current);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect( () => {
        axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
            .then((res) => deckId.current = res.data['deck_id'])
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if(drawingCards){
            drawCard()
            cardDrawIntervalId.current = setInterval( () => {
                drawCard();
            }, DRAW_SPEED);
        }
        return () => clearInterval(cardDrawIntervalId.current);
    }, [drawingCards]);



    return (
        <div>
            { cardsLeft ? (
                <button onClick={toggleDrawingCards}>
                    {drawingCards ? "Stop Drawing" : "Start Drawing" }
                </button>
                ) : null
            }
            
            { cards.length === 0 ? null :
                <Card card={cards[cards.length - 1]} /> 
            }
        </div>
    );
};

export default DeckOfCards