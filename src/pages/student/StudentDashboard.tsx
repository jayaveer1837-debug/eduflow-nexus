import { StudentLayout } from "@/components/layouts/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Trophy,
  ArrowRight,
  PlayCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const enrolledCourses = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    instructor: "Dr. Sarah Chen",
    progress: 65,
    totalModules: 12,
    completedModules: 8,
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Web Development Fundamentals",
    instructor: "Prof. Michael Brown",
    progress: 42,
    totalModules: 10,
    completedModules: 4,
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    instructor: "Dr. Emily White",
    progress: 28,
    totalModules: 15,
    completedModules: 4,
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop"
  }
];

const stats = [
  { label: "Courses Enrolled", value: "5", icon: BookOpen, color: "text-primary" },
  { label: "Hours Learned", value: "47", icon: Clock, color: "text-accent" },
  { label: "Quizzes Completed", value: "23", icon: Trophy, color: "text-primary" },
  { label: "Average Score", value: "87%", icon: TrendingUp, color: "text-accent" },
];

const recommendations = [
  { title: "Advanced Python Programming", category: "Programming" },
  { title: "Database Design Principles", category: "Data" },
  { title: "UI/UX Design Basics", category: "Design" },
];

const StudentDashboard = () => {
  return (
    <StudentLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Message */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Welcome back, Alex!
          </h2>
          <p className="text-muted-foreground">
            Continue your learning journey. You're doing great!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} variant="default">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enrolled Courses */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">My Courses</h3>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/student/courses">
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
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
                      {course.completedModules} of {course.totalModules} modules
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-lg">Recommended for You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                >
                  <p className="text-xs text-primary font-medium mb-1">{rec.category}</p>
                  <p className="font-medium text-foreground">{rec.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
