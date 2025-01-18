import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Mail, Phone, Book, Calendar, Award, Users } from "lucide-react";
import { StudentDetails, MentorDetails } from "../lib/data";

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentDetails | null;
  mentor: MentorDetails | null;
}

export function StudentProfileModal({
  isOpen,
  onClose,
  student,
  mentor,
}: StudentProfileModalProps) {
  if (!student || !mentor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Student Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Student Profile Card */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <img
                src={"/images/male-avatar.png"}
                alt="Avatar"
                className={`h-10 w-10 rounded-full`}
              />
              <div>
                <CardTitle>{student.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary">{student.department}</Badge>
                  <Badge variant="secondary">{student.year}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  {student.email}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  {student.phone}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Book className="h-4 w-4" />
                  GPA: {student.gpa.toFixed(2)}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  Attendance: {student.attendance}%
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mentor Profile Card */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{mentor.name}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary">{mentor.specialization}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  {mentor.email}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  {mentor.phone}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4" />
                  Experience: {mentor.experience}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  Students: {mentor.studentsCount}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Issue and Remedy Section */}
          <Card className="md:col-span-2">
            <CardHeader className="pl-4">
              <CardTitle>Academic Progress Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Current Issue</h4>
                <p className="text-sm text-muted-foreground">{student.issue}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Suggested Remedy</h4>
                <p className="text-sm text-muted-foreground">
                  {student.remedy}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
