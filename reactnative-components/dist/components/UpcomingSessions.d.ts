import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
interface Session {
    id: string;
    date: Date;
    duration: string;
    doctorName: string;
    type: string;
    status: 'confirmed' | 'pending';
}
interface StatusColors {
    backgroundColor: string;
    textColor: string;
}
interface StatusColorsMap {
    confirmed: StatusColors;
    pending: StatusColors;
}
interface CustomStyles {
    container?: ViewStyle;
    title?: TextStyle;
    sessionsContainer?: ViewStyle;
    dateHeader?: ViewStyle;
    dateText?: TextStyle;
    sessionCard?: ViewStyle;
    timeContainer?: ViewStyle;
    time?: TextStyle;
    duration?: TextStyle;
    sessionInfo?: ViewStyle;
    doctorName?: TextStyle;
    sessionType?: TextStyle;
    statusBadge?: ViewStyle;
    statusText?: TextStyle;
}
interface UpcomingSessionsProps {
    sessions?: Session[];
    title?: string;
    styles?: CustomStyles;
    statusColors?: StatusColorsMap;
    onSessionPress?: (session: Session) => void;
    dateFormat?: string;
    timeFormat?: string;
    renderCustomHeader?: (date: Date) => React.ReactNode;
    renderCustomSessionCard?: (session: Session) => React.ReactNode;
}
declare const UpcomingSessions: React.FC<UpcomingSessionsProps>;
export default UpcomingSessions;
