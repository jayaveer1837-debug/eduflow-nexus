import { StudentLayout } from "@/components/layouts/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, BookOpen, Target, Award } from "lucide-react";

const courseProgress = [
  { name: "Machine Learning", progress: 65, color: "bg-primary" },
  { name: "Web Development", progress: 42, color: "bg-accent" },
  { name: "Data Structures", progress: 28, color: "bg-primary" },
  { name: "Python Advanced", progress: 85, color: "bg-accent" },
  { name: "Database Design", progress: 10, color: "bg-primary" },
];

const quizScores = [
  { name: "ML Quiz 1", score: 92, date: "Dec 18" },
  { name: "Web Dev Quiz 3", score: 78, date: "Dec 15" },
  { name: "Python Quiz 2", score: 95, date: "Dec 12" },
  { name: "ML Quiz 2", score: 88, date: "Dec 10" },
  { name: "Data Structures Quiz 1", score: 72, date: "Dec 8" },
];

const achievements = [
  { title: "First Course Completed", icon: Award, earned: true },
  { title: "Quiz Master", icon: Target, earned: true },
  { title: "Consistent Learner", icon: TrendingUp, earned: true },
  { title: "Course Creator", icon: BookOpen, earned: false },
];

const StudentProgress = () => {
  const avgScore = Math.round(quizScores.reduce((acc, q) => acc + q.score, 0) / quizScores.length);
  const totalCourses = courseProgress.length;
  const avgProgress = Math.round(courseProgress.reduce((acc, c) => acc + c.progress, 0) / totalCourses);

  return (
    <StudentLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">My Progress</h2>
          <p className="text-muted-foreground">
            Track your learning journey and achievements
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="default">
            <CardContent className="p-5 text-center">
              <p className="text-4xl font-bold text-primary mb-1">{avgProgress}%</p>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
            </CardContent>
          </Card>
          <Card variant="default">
            <CardContent className="p-5 text-center">
              <p className="text-4xl font-bold text-accent mb-1">{avgScore}%</p>
              <p className="text-sm text-muted-foreground">Average Quiz Score</p>
            </CardContent>
          </Card>
          <Card variant="default">
            <CardContent className="p-5 text-center">
              <p className="text-4xl font-bold text-primary mb-1">{totalCourses}</p>
              <p className="text-sm text-muted-foreground">Courses Enrolled</p>
            </CardContent>
          </Card>
          <Card variant="default">
            <CardContent className="p-5 text-center">
              <p className="text-4xl font-bold text-accent mb-1">47</p>
              <p className="text-sm text-muted-foreground">Hours Learned</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Course Progress */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-lg">Course Completion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {courseProgress.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{course.name}</span>
                    <span className="text-muted-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quiz Scores */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-lg">Recent Quiz Scores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quizScores.map((quiz, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                >
                  <div>
                    <p className="font-medium text-foreground">{quiz.name}</p>
                    <p className="text-xs text-muted-foreground">{quiz.date}</p>
                  </div>
                  <div className={`text-lg font-bold ${
                    quiz.score >= 90 ? "text-primary" : 
                    quiz.score >= 70 ? "text-accent" : "text-destructive"
                  }`}>
                    {quiz.score}%
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="text-lg">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-xl text-center ${
                      achievement.earned
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-secondary/50 opacity-50"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
                      achievement.earned ? "bg-primary/20" : "bg-muted"
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        achievement.earned ? "text-primary" : "text-muted-foreground"
                      }`} />
                    </div>
                    <p className={`text-sm font-medium ${
                      achievement.earned ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {achievement.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default StudentProgress;
