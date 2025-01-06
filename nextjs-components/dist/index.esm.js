import React from 'react';

const Button = ({ label, onClick }) => {
    return React.createElement("button", { onClick: onClick }, label);
};

const Card = ({ title, content }) => {
    return (React.createElement("div", null,
        React.createElement("h3", null, title),
        React.createElement("p", null, content)));
};

export { Button, Card };
