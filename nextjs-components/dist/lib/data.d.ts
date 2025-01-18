export type Mentor = {
    id: string;
    name: string;
};
export type Student = {
    id: string;
    name: string;
    mentorId: string;
    gpa: number;
    avatar: string;
};
export type MentorSessionData = {
    month: string;
    sessions: number;
};
export type MentorPerformanceData = {
    month: string;
    gpa: number;
    attendance: number;
    projects: number;
};
export type StudentDetails = {
    id: string;
    name: string;
    mentorId: string;
    gpa: number;
    avatar: string;
    department: string;
    year: string;
    email: string;
    phone: string;
    attendance: number;
    projectsCompleted: number;
    issue: string;
    remedy: string;
};
export type MentorDetails = {
    id: string;
    name: string;
    avatar: string;
    department: string;
    specialization: string;
    email: string;
    phone: string;
    experience: string;
    studentsCount: number;
};
export type MentorCGPA = {
    id: string;
    name: string;
    averageCGPA: number;
};
export declare const mentors: Mentor[];
export declare const students: Student[];
export declare const mentorCGPAData: MentorCGPA[];
/**
 * Example: If you need a `mentorDetails` array for each mentor,
 * you could similarly generate it in code. Below is just
 * one example detail – adapt it as needed or generate 164 items.
 */
export declare const mentorDetails: MentorDetails[];
/**
 * Keep (or modify) your existing static studentDetails if you like.
 * If you want to cover all 3693 students, you'd do it similarly in a loop.
 */
export declare const studentDetails: StudentDetails[];
/**
 * Keep your existing mentorSessions if it’s still relevant to your app.
 */
export declare const mentorSessions: MentorSessionData[];
/**
 * Keep your existing mentorPerformance data if you want the monthly
 * performance stats to remain the same.
 */
export declare const mentorPerformance: MentorPerformanceData[];
