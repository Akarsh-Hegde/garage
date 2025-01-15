import React from 'react';
interface FoodItem {
    id: string;
    name: string;
    nutrients: string[];
    benefits: string[];
    imageUrl?: string;
    allergyWarnings?: string[];
    mealTime: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    sensoryConsiderations?: string[];
    texture: 'smooth' | 'crunchy' | 'mixed' | 'soft';
}
interface DietPlanProps {
    mealPlans: FoodItem[];
}
export default function DietPlanComponent({ mealPlans, }: DietPlanProps): React.JSX.Element;
export {};
