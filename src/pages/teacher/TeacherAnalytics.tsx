import { TeacherLayout } from "@/components/layouts/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, BookOpen, Target } from "lucide-react";

const overviewStats = [
  { label: "Total Students", value: "324", change: "+12%", icon: Users },
  { label: "Course Completions", value: "156", change: "+8%", icon: BookOpen },
  { label: "Average Quiz Score", value: "78%", change: "+5%", icon: Target },
  { label: "Engagement Rate", value: "72%", change: "+15%", icon: TrendingUp },
];

const courseStats = [
  { name: "Machine Learning", students: 89, completionRate: 68, avgScore: 82 },
  { name: "Python Programming", students: 124, completionRate: 54, avgScore: 75 },
  { name: "Data Science", students: 67, completionRate: 82, avgScore: 88 },
  { name: "Web Development", students: 44, completionRate: 45, avgScore: 71 },
];

const TeacherAnalytics = () => {
  return (
    <TeacherLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Analytics</h2>
          <p className="text-muted-foreground">
            Track student progress and course performance
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} variant="default">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-primary mt-1">{stat.change} this month</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Course Performance Table */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="text-lg">Course Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Course</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Students</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Completion Rate</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Avg Score</th>
                  </tr>
                </thead>
                <tbody>
                  {courseStats.map((course, index) => (
                    <tr key={index} className="border-b border-border/50 last:border-0">
                      <td className="py-4 px-4">
                        <p className="font-medium text-foreground">{course.name}</p>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-foreground">{course.students}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          course.completionRate >= 70 
                            ? "bg-primary/10 text-primary" 
                            : course.completionRate >= 50 
                              ? "bg-accent/10 text-accent" 
                              : "bg-muted text-muted-foreground"
                        }`}>
                          {course.completionRate}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`font-medium ${
                          course.avgScore >= 80 ? "text-primary" : "text-foreground"
                        }`}>
                          {course.avgScore}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Visual Charts Placeholder */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-lg">Student Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-secondary/30 rounded-xl">
                <p className="text-muted-foreground text-sm">Engagement chart visualization</p>
              </div>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-lg">Quiz Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-secondary/30 rounded-xl">
                <p className="text-muted-foreground text-sm">Performance trends visualization</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherAnalytics;
