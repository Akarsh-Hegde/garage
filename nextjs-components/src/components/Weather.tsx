import React from "react";

export interface WeatherWidgetProps {
  location: string;
  temperature: number;
  description: string;
  backgroundColor?: string; // Optional prop for background color
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  location,
  temperature,
  description,
  backgroundColor = "#4299e1", // Default background color
}) => (
  <div className="widget">
    <div className="icon">⛅</div>
    <div className="content">
      <h2>{location}</h2>
      <p className="temperature">{temperature}°C</p>
      <p className="description">{description}</p>
    </div>

    {/* Dynamic background color applied to the widget */}
    <style jsx>{`
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
    `}</style>
  </div>
);

export default WeatherWidget;
