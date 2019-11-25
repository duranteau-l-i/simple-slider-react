import * as React from 'react';
import './Card.css';
import heart_filled from '../../Assets/Images/heart_filled.png';
import heart_unfilled from '../../Assets/Images/heart_unfilled.png';
import logo from '../../Assets/Images/logo-twitter-rond.png';

interface cardProps {
  card: any;
  index: number;
  ratio: number;
  visible: number;
  liked: (index: number) => void;
}

const Card: React.FC<cardProps> = ({ card, index, ratio, visible, liked }) => (
  <div className="card" style={{ width: 100 / visible / ratio + '%' }}>
    <a href={card.href}>
      <div>
        <img className="photo" src={card.image_url} alt={card.title} />
        <div className="title">
          <p className="avatar">
            <img src={logo} alt="" />
          </p>
          <h3>
            {card.title}
            <br />
            <span>{card.subtitle}</span>
          </h3>
        </div>
        <p className="text" dangerouslySetInnerHTML={{ __html: card.text }} />
      </div>
    </a>
    <p className="heart" onClick={() => liked(index)}>
      {card.is_liked ? (
        <img src={heart_filled} alt="liked" />
      ) : (
        <img src={heart_unfilled} alt="unliked" />
      )}
    </p>
  </div>
);

export default Card;
