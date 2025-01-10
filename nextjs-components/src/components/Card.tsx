import React from 'react';

interface CardProps {
  title: string;
  content: string;
}

const Card: React.ComponentType<CardProps> = ({ title, content }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Card;
