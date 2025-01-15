import React from 'react';
export interface Medicine {
    name: string;
    dose: string;
    date?: Date;
}
interface MedicineManagerProps {
    initialMedicines: Medicine[];
    initialVisibleItems?: number;
    onMedicineAdded?: (medicine: Medicine) => void;
}
export default function MedicineManager({ initialMedicines, initialVisibleItems, onMedicineAdded, }: MedicineManagerProps): React.JSX.Element;
export {};
