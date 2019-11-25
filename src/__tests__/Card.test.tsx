import React from 'react';
import { shallow, mount } from 'enzyme';

import Card from '../Components/Card';

describe('<Card/>', () => {
  let props = {
    card: {
      id: 1,
      title: 'We are Humans',
      subtitle: 'And we love humans',
      text:
        'We act like humans, we talk like humans, and we think like humans. And we call out anyone who does the opposite.',
      image_url: 'https://picsum.photos/300/150/?random=1',
      href: 'https://www.31-solutions.com/',
      is_liked: true,
    },
    index: 1,
  };

  it('renders without crashing', () => {
    const wrapper = mount(
      <Card card={props.card} index={props.index} ratio={0} visible={1} liked={() => {}} />,
    );
    expect(wrapper.find(Card).length).toEqual(1);
  });

  it('Card props.isLiked = true / Image liked', () => {
    const wrapper = shallow(
      <Card card={props.card} index={props.index} ratio={0} visible={1} liked={() => {}} />,
    );
    expect(wrapper.find({ alt: 'liked' }).prop('src')).toEqual('heart_filled.png');
  });

  it('Card props.isLiked = false / Image unliked', () => {
    props.card.is_liked = false;

    const wrapper = shallow(
      <Card card={props.card} index={props.index} ratio={0} visible={1} liked={() => {}} />,
    );
    expect(wrapper.find({ alt: 'unliked' }).prop('src')).toEqual('heart_unfilled.png');
  });
});
