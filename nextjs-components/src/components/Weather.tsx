import React from "react";

export interface WeatherWidgetProps {
  location: string;
  temperature: number;
  description: string;
  style?: React.CSSProperties; // Allow users to pass custom styles
  iconStyle?: React.CSSProperties; // Allow custom styles for the icon
  contentStyle?: React.CSSProperties; // Allow custom styles for the content
}

const WeatherWidget: React.ComponentType<WeatherWidgetProps> = ({
  location,
  temperature,
  description,
  style = {}, // Default to an empty object
  iconStyle = {}, // Default to an empty object
  contentStyle = {}, // Default to an empty object
}) => {
  const defaultWidgetStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    borderRadius: "8px",
    color: "white",
    fontFamily: "Arial, sans-serif",
    gap: "16px",
    backgroundColor: "#4299e1", // Default background color
    ...style, // Override with user-provided styles
  };

  const defaultIconStyles: React.CSSProperties = {
    fontSize: "24px",
    backgroundColor: "white",
    color: "#4299e1",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...iconStyle, // Override with user-provided icon styles
  };

  const defaultContentStyles: React.CSSProperties = {
    flex: 1,
    ...contentStyle, // Override with user-provided content styles
  };

  const titleStyles: React.CSSProperties = {
    margin: 0,
    fontSize: "18px",
  };

  const temperatureStyles: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "4px 0",
  };

  const descriptionStyles: React.CSSProperties = {
    margin: 0,
    fontSize: "14px",
    opacity: 0.8,
  };

  return (
    <div style={defaultWidgetStyles}>
      <div style={defaultIconStyles}>⛅</div>
      <div style={defaultContentStyles}>
        <h2 style={titleStyles}>{location}</h2>
        <p style={temperatureStyles}>{temperature}°C</p>
        <p style={descriptionStyles}>{description}</p>
      </div>
    </div>
  );
};

export default WeatherWidget;
