import { useState } from 'react';

export interface ICard {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  image_url: string;
  href: string;
  is_liked: boolean;
}

export const useCards = () => {
  const [cards, setCards] = useState<ICard[]>([]);

  const cardsState = (data: ICard[]) => setCards([...data]);

  return {
    cards,
    cardsState,
  };
};

export const useCurrentCard = () => {
  const [currentCard, setCurrentCard] = useState<number>(0);

  const currentCardState = (data: number) => setCurrentCard(data);

  return {
    currentCard,
    currentCardState,
  };
};

export const useCardsVisible = () => {
  const [cardsVisible, setCardsVisible] = useState<number>(3);

  const cardsVisibleState = (data: number) => setCardsVisible(data);

  return {
    cardsVisible,
    cardsVisibleState,
  };
};

export const useCardsToScroll = () => {
  const [cardsToScroll, setCardsToScroll] = useState<number>(2);

  const cardsToScrollState = (data: number) => setCardsToScroll(data);

  return {
    cardsToScroll,
    cardsToScrollState,
  };
};

export const useError = () => {
  const [error, setError] = useState<string | null>(null);

  const errorState = (data: string) => setError(data);

  return {
    error,
    errorState,
  };
};

export const useRatio = () => {
  const [ratio, setRatio] = useState<number>(0);

  const ratioState = (data: number) => setRatio(data);

  return {
    ratio,
    ratioState,
  };
};
