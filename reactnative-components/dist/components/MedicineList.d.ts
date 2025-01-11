import React from 'react';
interface Medicine {
    name: string;
    dose: string;
    date: Date;
}
interface MedicineListProps {
    medicines: Medicine[];
    initialVisibleItems?: number;
}
export default function MedicineList({ medicines, initialVisibleItems, }: MedicineListProps): React.JSX.Element;
export {};
