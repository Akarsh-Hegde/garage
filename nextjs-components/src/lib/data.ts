// -----------------------------------------
// Types
// -----------------------------------------

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

// -----------------------------------------
// Config
// -----------------------------------------

const TOTAL_MENTORS = 164;
const TOTAL_STUDENTS = 3693;

// For CGPA distribution (mentors)
const MEAN_CGPA = 7.0;    // Center of the bell curve
const SD_CGPA = 1.5;      // Width/spread of the bell curve
const MIN_CGPA = 4.0;     // Clamp minimum
const MAX_CGPA = 10.0;    // Clamp maximum

// -----------------------------------------
// Helper Functions
// -----------------------------------------

/**
 * Generate a random number ~ N(0, 1) using the Box-Muller transform,
 * then scale and shift it to produce ~ N(mean, sd).
 */
function randomNormal(mean: number, sd: number): number {
  let u = 0;
  let v = 0;

  // Convert [0,1) to (0,1)
  while (u === 0) { u = Math.random(); }
  while (v === 0) { v = Math.random(); }

  // Box-Muller transform
  let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  // Scale & shift
  z = z * sd + mean;
  return z;
}

/**
 * Generates a random normally distributed CGPA in the range 4.0 - 10.0,
 * centered around MEAN_CGPA (7.0) with stdev SD_CGPA (1.5).
 */
function generateRandomCGPA(): number {
  let cgpa = randomNormal(MEAN_CGPA, SD_CGPA);

  // Clamp to [MIN_CGPA, MAX_CGPA]
  if (cgpa < MIN_CGPA) cgpa = MIN_CGPA;
  if (cgpa > MAX_CGPA) cgpa = MAX_CGPA;

  // Round to 2 decimal places
  return parseFloat(cgpa.toFixed(2));
}

// -----------------------------------------
// Generators
// -----------------------------------------

/**
 * Generate an array of mentors, each having an incremental ID
 * and a generic name like "Mentor 1", "Mentor 2", etc.
 */
function generateMentors(count: number): Mentor[] {
  return Array.from({ length: count }, (_, i) => ({
    id: (i + 1).toString(),
    name: `Mentor ${i + 1}`,
  }));
}

/**
 * Generate an array of students, each assigned to a random mentor.
 * For demo purposes, we randomly assign GPA 4–10, but you can modify
 * the logic based on your actual data needs.
 */
function generateStudents(count: number, mentorCount: number): Student[] {
  return Array.from({ length: count }, (_, i) => {
    const randomMentorId = Math.floor(Math.random() * mentorCount + 1).toString();
    const randomGPA = Number((Math.random() * 6 + 4).toFixed(2)); // ~4.00 - 10.00

    return {
      id: (i + 1).toString(),
      name: `Student ${i + 1}`,
      mentorId: randomMentorId,
      gpa: randomGPA,
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20at%206.09.28%E2%80%AFAM-PJJ64ZFLO9R7o0BEsmZys1qXIfUF5a.png",
    };
  });
}

/**
 * Generate an array for mentor CGPA data using a normal distribution.
 */
function generateMentorCGPAData(count: number): MentorCGPA[] {
  return Array.from({ length: count }, (_, i) => {
    return {
      id: (i + 1).toString(),
      name: `Mentor ${i + 1}`,
      averageCGPA: generateRandomCGPA(),
    };
  });
}

// -----------------------------------------
// Actual Data
// -----------------------------------------

export const mentors: Mentor[] = generateMentors(TOTAL_MENTORS);
export const students: Student[] = generateStudents(TOTAL_STUDENTS, TOTAL_MENTORS);
export const mentorCGPAData: MentorCGPA[] = generateMentorCGPAData(TOTAL_MENTORS);

/**
 * Example: If you need a `mentorDetails` array for each mentor,
 * you could similarly generate it in code. Below is just
 * one example detail – adapt it as needed or generate 164 items.
 */
export const mentorDetails: MentorDetails[] = [
  {
    id: "1",
    name: "Dr. Nagesh",
    avatar:
      "",
    department: "Computer Science",
    specialization: "Artificial Intelligence & Machine Learning",
    email: "nageshg@pes.edu",
    phone: "+91 98765 43200",
    experience: "15 years",
    studentsCount: 25,
  },
  {
    id: "2",
    name: "Prof. Priya",
    avatar:
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    department: "Computer Science",
    specialization: "Artificial Intelligence & Machine Learning",
    email: "priya@pes.edu",
    phone: "+91 98765 43201",
    experience: "12 years",
    studentsCount: 20,
  },
  {
    id: "3",
    name: "Prof. Nitya",
    avatar:
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    department: "Computer Science",
    specialization: "Artificial Intelligence & Machine Learning",
    email: "nitya@pes.edu",
    phone: "+91 98765 43202",
    experience: "10 years",
    studentsCount: 18,
  }
  // ... Generate or manually add more mentor details if needed
];

/**
 * Keep (or modify) your existing static studentDetails if you like.
 * If you want to cover all 3693 students, you'd do it similarly in a loop.
 */
export const studentDetails: StudentDetails[] = [
  {
    id: "1",
    name: "Aarav Priya",
    mentorId: "1",
    gpa: 5.8,
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20at%206.09.28%E2%80%AFAM-PJJ64ZFLO9R7o0BEsmZys1qXIfUF5a.png",
    department: "Computer Science",
    year: "3rd Year",
    email: "aarav.priya@pes.edu",
    phone: "+91 98765 43210",
    attendance: 85,
    projectsCompleted: 7,
    issue: "Declining performance is causing her to feel bad about her abilities",
    remedy:
      "Recommend additional practice in weak subjects and one-on-one tutoring sessions if necessary",
  },
  {
    id: "2",
    name: "Aarav Nitya",
    mentorId: "2",
    gpa: 6.0,
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20at%206.09.28%E2%80%AFAM-PJJ64ZFLO9R7o0BEsmZys1qXIfUF5a.png",
    department: "Computer Science",
    year: "2nd Year",
    email: "aarav.nitya@pes.edu",
    phone: "+91 98765 43211",
    attendance: 92,
    projectsCompleted: 5,
    issue: "Struggling with time management and project deadlines. He has a low self-esteem",
    remedy:
      "Set up weekly planning sessions and implement a structured study program. I have also requested to interview his parents.",
  },
  {
    id: "3",
    name: "Vihaan Priya",
    mentorId: "3",
    gpa: 7.8,
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-16%20at%206.09.28%E2%80%AFAM-PJJ64ZFLO9R7o0BEsmZys1qXIfUF5a.png",
    department: "Computer Science",
    year: "4th Year",
    email: "vihaan.priya@pes.edu",
    phone: "+91 98765 43212",
    attendance: 95,
    projectsCompleted: 9,
    issue: "Need guidance for research project selection",
    remedy:
      "Schedule consultation with research faculty and provide relevant research paper recommendations",
  },
];

/**
 * Keep your existing mentorSessions if it’s still relevant to your app.
 */
export const mentorSessions: MentorSessionData[] = [
  { month: "Jan", sessions: 200 },
  { month: "Feb", sessions: 400 },
  { month: "Mar", sessions: 100 },
  { month: "Apr", sessions: 600 },
  { month: "May", sessions: 800 },
  { month: "Jun", sessions: 400 },
  { month: "Jul", sessions: 700 },
  { month: "Aug", sessions: 900 },
  { month: "Sep", sessions: 100 },
  { month: "Oct", sessions: 800 },
  { month: "Nov", sessions: 900 },
  { month: "Dec", sessions: 200 },
];

/**
 * Keep your existing mentorPerformance data if you want the monthly
 * performance stats to remain the same.
 */
export const mentorPerformance: MentorPerformanceData[] = [
  { month: "Jan", gpa: 3.5, attendance: 85, projects: 5 },
  { month: "Feb", gpa: 3.6, attendance: 87, projects: 6 },
  { month: "Mar", gpa: 3.7, attendance: 88, projects: 6 },
  { month: "Apr", gpa: 3.8, attendance: 90, projects: 7 },
  { month: "May", gpa: 3.9, attendance: 92, projects: 7 },
  { month: "Jun", gpa: 3.8, attendance: 91, projects: 8 },
  { month: "Jul", gpa: 4.0, attendance: 93, projects: 8 },
  { month: "Aug", gpa: 4.1, attendance: 94, projects: 9 },
  { month: "Sep", gpa: 4.0, attendance: 93, projects: 9 },
  { month: "Oct", gpa: 4.2, attendance: 95, projects: 10 },
  { month: "Nov", gpa: 4.3, attendance: 96, projects: 10 },
  { month: "Dec", gpa: 4.4, attendance: 97, projects: 11 },
];