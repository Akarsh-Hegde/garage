import React from "react";
export interface WeatherWidgetProps {
    location: string;
    temperature: number;
    description: string;
    backgroundColor?: string;
}
declare const WeatherWidget: React.FC<WeatherWidgetProps>;
export default WeatherWidget;
