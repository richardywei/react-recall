import React, { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const newCards = generateCards();
    setCards(newCards);
  }, []);

  const generateCards = () => {
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let deck = [];

    cardValues.forEach((value) => {
      deck.push({ id: uuidv4(), value, isFlipped: false });
      deck.push({ id: uuidv4(), value, isFlipped: false });
    });

    return shuffle(deck);
  };

  const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const handleCardClick = (card) => {
    if (flippedCards.length === 2 || card.isFlipped || matchedCards.includes(card.id)) {
      return;
    }

    setScore(score + 1);

    if (flippedCards.length === 0) {
      setFlippedCards([card]);
      return;
    }

    if (flippedCards[0].value === card.value) {
      setMatchedCards([...matchedCards, flippedCards[0].id, card.id]);
      setFlippedCards([]);
    } else {
      setFlippedCards([flippedCards[0], card]);
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  const renderCards = () => {
    return cards.map((card) => {
      const isFlipped = flippedCards.includes(card) || matchedCards.includes(card.id);

      return (
        <div
          key={card.id}
          className={`card ${isFlipped ? 'flipped' : ''}`}
          onClick={() => handleCardClick(card)}
        >
          {isFlipped ? card.value : ''}
        </div>
      );
    });
  };

  return (
    <div className="App">
      <header>
        <h1>React Memory Game</h1>
        <h2>Score: {score}</h2>
      </header>
      <div className="game-board">{renderCards()}</div>
    </div>
  );
};

export default App;
