import React from "react";
export interface WeatherWidgetProps {
    location: string;
    temperature: number;
    description: string;
    style?: React.CSSProperties;
    iconStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
}
declare const WeatherWidget: React.ComponentType<WeatherWidgetProps>;
export default WeatherWidget;
