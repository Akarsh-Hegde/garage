import React from "react";
export interface WeatherWidgetProps {
    location: string;
    temperature: number;
    description: string;
}
declare const WeatherWidget: React.ComponentType<WeatherWidgetProps>;
export declare const styles: {
    widgetContainer: {
        flexDirection: "row";
        alignItems: "flex-start";
        marginBottom: number;
        width: "100%";
    };
    iconContainer: {
        width: number;
        height: number;
        borderRadius: number;
        backgroundColor: string;
        justifyContent: "center";
        alignItems: "center";
        marginRight: number;
    };
    weatherContent: {
        backgroundColor: string;
        padding: number;
        borderRadius: number;
        flex: number;
        width: "100%";
    };
    weatherTitle: {
        color: string;
        fontSize: number;
    };
    temperature: {
        color: string;
        fontSize: number;
        fontWeight: "bold";
    };
    description: {
        color: string;
        fontSize: number;
    };
};
export default WeatherWidget;
