import { StudentLayout } from "@/components/layouts/StudentLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Search, PlayCircle, Clock, BookOpen } from "lucide-react";
import { useState } from "react";

const allCourses = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    instructor: "Dr. Sarah Chen",
    progress: 65,
    totalModules: 12,
    completedModules: 8,
    duration: "8 hours",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Web Development Fundamentals",
    instructor: "Prof. Michael Brown",
    progress: 42,
    totalModules: 10,
    completedModules: 4,
    duration: "12 hours",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    instructor: "Dr. Emily White",
    progress: 28,
    totalModules: 15,
    completedModules: 4,
    duration: "15 hours",
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop"
  },
  {
    id: 4,
    title: "Advanced Python Programming",
    instructor: "Prof. John Davis",
    progress: 85,
    totalModules: 8,
    completedModules: 7,
    duration: "6 hours",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=200&fit=crop"
  },
  {
    id: 5,
    title: "Database Design Principles",
    instructor: "Dr. Lisa Wong",
    progress: 10,
    totalModules: 10,
    completedModules: 1,
    duration: "10 hours",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=200&fit=crop"
  }
];

const StudentCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = allCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <StudentLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">My Courses</h2>
          <p className="text-muted-foreground">
            Continue learning from where you left off
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12"
          />
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} variant="feature" className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <button className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-primary-foreground/90 flex items-center justify-center">
                    <PlayCircle className="w-8 h-8 text-primary" />
                  </div>
                </button>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-primary-foreground text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {course.totalModules} modules
                  </span>
                </div>
              </div>
              <CardContent className="p-5">
                <h4 className="font-semibold text-foreground mb-1 line-clamp-1">
                  {course.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {course.instructor}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {course.completedModules} of {course.totalModules} modules completed
                  </p>
                </div>
                <Button variant="subtle" className="w-full mt-4">
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses found matching your search.</p>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default StudentCourses;
