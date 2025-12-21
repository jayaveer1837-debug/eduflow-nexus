import { TeacherLayout } from "@/components/layouts/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  FileQuestion,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Active Courses", value: "8", icon: BookOpen, color: "text-accent" },
  { label: "Total Students", value: "324", icon: Users, color: "text-primary" },
  { label: "Avg. Completion", value: "72%", icon: TrendingUp, color: "text-accent" },
  { label: "Pending Quizzes", value: "12", icon: FileQuestion, color: "text-primary" },
];

const myCourses = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    students: 89,
    completion: 68,
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    title: "Advanced Python Programming",
    students: 124,
    completion: 54,
    lastActivity: "5 hours ago"
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    students: 67,
    completion: 82,
    lastActivity: "1 day ago"
  }
];

const recentActivity = [
  { type: "quiz", text: "John D. completed Quiz: ML Basics", time: "10 min ago" },
  { type: "enrollment", text: "5 new students enrolled in Python course", time: "1 hour ago" },
  { type: "completion", text: "Sarah M. completed Module 5", time: "2 hours ago" },
  { type: "question", text: "New discussion in Data Science course", time: "3 hours ago" },
];

const pendingActions = [
  { title: "Review Quiz: Advanced Algorithms", deadline: "Today" },
  { title: "Respond to 3 student questions", deadline: "Today" },
  { title: "Update Module 6 content", deadline: "Tomorrow" },
];

const TeacherDashboard = () => {
  return (
    <TeacherLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Message */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Welcome back, Professor!
            </h2>
            <p className="text-muted-foreground">
              Here's what's happening with your courses today.
            </p>
          </div>
          <Button variant="accent" asChild>
            <Link to="/teacher/courses">
              <Plus className="w-4 h-4" />
              Create Course
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} variant="default">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Course Overview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Your Courses</h3>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/teacher/courses">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {myCourses.map((course) => (
                <Card key={course.id} variant="feature">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">
                          {course.title}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {course.students} students
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {course.completion}% avg completion
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.lastActivity}
                          </span>
                        </div>
                      </div>
                      <Button variant="subtle" size="sm">
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Actions */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  Pending Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingActions.map((action, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-accent/5 border border-accent/10"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{action.title}</p>
                      <p className="text-xs text-accent">{action.deadline}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/teacher/upload">
                    <Plus className="w-4 h-4" />
                    Upload Content
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/teacher/quizzes">
                    <FileQuestion className="w-4 h-4" />
                    Create Quiz
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/teacher/analytics">
                    <TrendingUp className="w-4 h-4" />
                    View Analytics
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherDashboard;
