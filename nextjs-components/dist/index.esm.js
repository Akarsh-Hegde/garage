import React from 'react';

const Button = ({ label, onClick }) => {
    return React.createElement("button", { onClick: onClick }, label);
};

const Card = ({ title, content }) => {
    return (React.createElement("div", null,
        React.createElement("h3", null, title),
        React.createElement("p", null, content)));
};

const WeatherWidget = ({ location, temperature, description, backgroundColor = "#4299e1", // Default background color
 }) => (React.createElement("div", { className: "widget" },
    React.createElement("div", { className: "icon" }, "\u26C5"),
    React.createElement("div", { className: "content" },
        React.createElement("h2", null, location),
        React.createElement("p", { className: "temperature" },
            temperature,
            "\u00B0C"),
        React.createElement("p", { className: "description" }, description)),
    React.createElement("style", { jsx: true }, `
      .widget {
        display: flex;
        align-items: center;
        padding: 16px;
        border-radius: 8px;
        color: white;
        font-family: Arial, sans-serif;
        gap: 16px;
        background-color: ${backgroundColor};
      }

      .icon {
        font-size: 24px;
        background-color: white;
        color: #4299e1;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .content h2 {
        margin: 0;
        font-size: 18px;
      }

      .temperature {
        font-size: 24px;
        font-weight: bold;
        margin: 4px 0;
      }

      .description {
        margin: 0;
        font-size: 14px;
        opacity: 0.8;
      }
    `)));

export { Button, Card, WeatherWidget };
