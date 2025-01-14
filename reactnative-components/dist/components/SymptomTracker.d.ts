import React from 'react';
type SeverityLevel = 'Minimal' | 'Mild' | 'Moderate' | 'Moderately Severe' | 'Severe';
interface DataPoint {
    date: string;
    severity: SeverityLevel;
}
interface SeverityTrackerProps {
    data?: DataPoint[];
}
declare const SeverityTracker: React.FC<SeverityTrackerProps>;
export default SeverityTracker;
