import React, { useEffect, useRef } from 'react';
import { fetchData } from '../../API/CardsAPI';
import Card from '../Card';
import leftArrow from '../../Assets/Images/left_arrow.png';
import rightArrow from '../../Assets/Images/right_arrow.png';
import './App.css';

import {
  useCards,
  useCurrentCard,
  useCardsVisible,
  useCardsToScroll,
  useError,
  useRatio,
} from './AppHooks';

export interface ICard {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  image_url: string;
  href: string;
  is_liked: boolean;
}

const App: React.FC = () => {
  const { cards, cardsState } = useCards();
  const { currentCard, currentCardState } = useCurrentCard();
  const { cardsVisible, cardsVisibleState } = useCardsVisible();
  const { cardsToScroll } = useCardsToScroll();
  const { error, errorState } = useError();
  const { ratio, ratioState } = useRatio();
  const sliderCards = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    try {
      fetchData()
        .then(data => {
          cardsState(data);
        })
        .then(() => onResize());
    } catch (e) {
      errorState('Error');
    }
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const prev = (): void => {
    goTo(currentCard - cardsToScroll);
  };

  const next = (): void => {
    goTo(currentCard + cardsToScroll);
  };

  const goTo = (index: number): void => {
    if (index < 0) {
      return;
    } else if (
      index >= cards.length ||
      (cards[currentCard + cardsVisible] === undefined && index > currentCard)
    ) {
      return;
    }
    const move = (index * -100) / cards.length;
    if (sliderCards.current) {
      sliderCards.current.style.transform = 'translate3d(' + move + '%, 0, 0)';
    }
    currentCardState(index);
  };

  const liked = (index: number): void => {
    const [...cardsToModify] = cards;
    cardsToModify[index - 1].is_liked = !cardsToModify[index - 1].is_liked;
    cardsState(cardsToModify);
  };

  const onResize = (): void => {
    if (window.innerWidth < 360) {
      cardsVisibleState(1);
      ratioState(cards.length / cardsVisible);
    } else if (window.innerWidth < 700) {
      cardsVisibleState(2);
      ratioState(cards.length / cardsVisible);
    } else {
      cardsVisibleState(3);
      ratioState(cards.length / cardsVisible);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="container">
      <div
        ref={sliderCards}
        className="slider_cards"
        style={{
          width: (cards.length / cardsVisible) * 100 + '%',
        }}
      >
        {cards.map((card: ICard, index: number) => (
          <Card
            key={card.id}
            index={index}
            card={card}
            ratio={ratio}
            visible={cardsVisible}
            liked={() => liked(card.id)}
          />
        ))}
      </div>
      <div className="slider_buttons">
        <button className="left" onClick={() => prev()}>
          {currentCard > 0 && <img src={leftArrow} alt="left" />}
        </button>
        <button className="right" onClick={() => next()}>
          {currentCard < cards.length - cardsVisible && <img src={rightArrow} alt="right" />}
        </button>
      </div>
    </div>
  );
};

export default App;
