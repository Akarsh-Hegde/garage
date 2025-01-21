import React from "react";
import { StudentDetails, MentorDetails } from "../lib/data";
interface StudentProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: StudentDetails | null;
    mentor: MentorDetails | null;
}
export declare function StudentProfileModal({ isOpen, onClose, student, mentor, }: StudentProfileModalProps): React.JSX.Element | null;
export {};
