import { TeacherLayout } from "@/components/layouts/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, User, TrendingUp, Clock, MoreVertical } from "lucide-react";
import { useState } from "react";

const students = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.j@email.com",
    courses: ["Machine Learning", "Python"],
    progress: 78,
    lastActive: "2 hours ago",
    status: "active"
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.w@email.com",
    courses: ["Data Science"],
    progress: 92,
    lastActive: "1 hour ago",
    status: "active"
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@email.com",
    courses: ["Machine Learning", "Web Dev"],
    progress: 45,
    lastActive: "3 days ago",
    status: "slow"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "e.davis@email.com",
    courses: ["Python", "Data Science"],
    progress: 100,
    lastActive: "5 hours ago",
    status: "completed"
  },
  {
    id: 5,
    name: "James Wilson",
    email: "j.wilson@email.com",
    courses: ["Web Development"],
    progress: 32,
    lastActive: "1 week ago",
    status: "slow"
  },
];

const TeacherStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-primary/10 text-primary border-0">Active</Badge>;
      case "slow":
        return <Badge variant="default" className="bg-accent/10 text-accent border-0">Slow Learner</Badge>;
      case "completed":
        return <Badge variant="default" className="bg-primary/10 text-primary border-0">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <TeacherLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Students</h2>
            <p className="text-muted-foreground">
              Monitor and manage your enrolled students
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {students.length} total students
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12"
          />
        </div>

        {/* Students List */}
        <Card variant="elevated">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="p-5 hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground truncate">
                            {student.name}
                          </h4>
                          {getStatusBadge(student.status)}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {student.email}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {student.progress}% progress
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {student.lastActive}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex flex-wrap gap-1">
                        {student.courses.map((course, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No students found matching your search.</p>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
};

export default TeacherStudents;
