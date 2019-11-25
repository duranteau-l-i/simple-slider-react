import React from 'react';
import ReactDOM from 'react-dom';

import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import App from '../Components/App';
import { fakeData } from '../__mocks__/CardsAPI';

import { fetchData } from '../API/CardsAPI';

import {
  useCards,
  useCurrentCard,
  useCardsVisible,
  useCardsToScroll,
  useError,
  useRatio,
} from '../Components/App/AppHooks';

let results: any;
const renderHook = (hook: () => {}) => {
  function HookWrapper() {
    results = hook();
    return null;
  }
  mount(<HookWrapper />);
  return results;
};

jest.mock('../API/CardsAPI', () => ({ fetchData: jest.fn() }));

describe('<App/>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing enzyme', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(App)).toHaveLength(1);
    expect(wrapper.find(App)).not.toBe(null);
  });

  it('should have a side effect', () => {
    const wrapper = mount(<App />);
    expect(fetchData).toHaveBeenCalledTimes(3);
  });

  describe('App Hooks', () => {
    it('useCards', () => {
      renderHook(useCards);
      expect(results.cards.length).toEqual(0);

      act(() => {
        results.cardsState(fakeData);
      });

      expect(results.cards.length).toEqual(9);
    });

    it('useCurrentCard', () => {
      renderHook(useCurrentCard);
      expect(results.currentCard).toEqual(0);

      act(() => {
        results.currentCardState(1);
      });

      expect(results.currentCard).toEqual(1);
    });

    it('useCardsVisible', () => {
      renderHook(useCardsVisible);
      expect(results.cardsVisible).toEqual(3);

      act(() => {
        results.cardsVisibleState(2);
      });

      expect(results.cardsVisible).toEqual(2);
    });

    it('useCardsToScroll', () => {
      renderHook(useCardsToScroll);
      expect(results.cardsToScroll).toEqual(2);

      act(() => {
        results.cardsToScrollState(1);
      });

      expect(results.cardsToScroll).toEqual(1);
    });

    it('useError', () => {
      renderHook(useError);
      expect(results.error).toEqual(null);

      act(() => {
        results.errorState('Error');
      });

      expect(results.error).toEqual('Error');
    });

    it('useRatio', () => {
      renderHook(useRatio);
      expect(results.ratio).toEqual(0);

      act(() => {
        results.ratioState(33);
      });

      expect(results.ratio).toEqual(33);
    });
  });
});
