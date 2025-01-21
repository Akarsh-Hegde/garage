import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Info } from "lucide-react";
import { StudentProfileModal } from "./student-profile-modal";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { StudentDetails, MentorDetails, mentorDetails, studentDetails } from "../lib/data";


const thresholdGPA = 6.75; // GPA threshold for color coding

const StudentCareList: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<StudentDetails | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (student: StudentDetails) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const getMentorForStudent = (mentorId: string): MentorDetails | null => {
    return mentorDetails.find((mentor) => mentor.id === mentorId) || null;
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Mentor</TableHead>
            <TableHead className="text-right">GPA</TableHead>
            <TableHead className="text-right">Info</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {studentDetails.map((student) => {
            const gpa = student.gpa;
            const color =
              gpa < thresholdGPA ? "bg-red-500" : "bg-yellow-500";
            const mentor = getMentorForStudent(student.mentorId);

            return (
              <TableRow
                key={student.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(student)}
              >
                <TableCell>
                  <div className="relative">
                    <img
                      src={"/images/male-avatar.png"}
                      alt="Avatar"
                      className={`h-10 w-10 rounded-full ${color}`}
                      title={`GPA: ${gpa}`}
                    />
                  </div>
                </TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{mentor?.name || "Unknown Mentor"}</TableCell>
                <TableCell className="text-right">{gpa.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="p-3 text-md">
                          <p>
                            <strong>Reason:</strong> GPA below {thresholdGPA}.
                          </p>
                          <p>
                            <strong>Action:</strong> Referred to mentor{" "}
                            {mentor?.name || "Unknown Mentor"}.
                          </p>
                          <p>
                            <strong>Taken By:</strong> Academic Counselor.
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <StudentProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        student={selectedStudent}
        mentor={
          selectedStudent ? getMentorForStudent(selectedStudent.mentorId) : null
        }
      />
    </div>
  );
}

export default StudentCareList;