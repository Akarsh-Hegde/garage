import React from "react";
export interface WeatherWidgetProps {
    location: string;
    temperature: number;
    description: string;
    style?: React.CSSProperties;
    iconStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
}
declare const WeatherWidget: React.FC<WeatherWidgetProps>;
export default WeatherWidget;
