import { StudentLayout } from "@/components/layouts/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, BookOpen, Target, Award, Sparkles, Flame, Zap } from "lucide-react";

const courseProgress: { name: string; progress: number; color: string }[] = [];

const quizScores: { name: string; score: number; date: string }[] = [];

const achievements = [
  { title: "First Course Completed", icon: Award, earned: false },
  { title: "Quiz Master", icon: Target, earned: false },
  { title: "Consistent Learner", icon: Flame, earned: false },
  { title: "Speed Learner", icon: Zap, earned: false },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12
    }
  }
};

const StudentProgress = () => {
  const avgScore = Math.round(quizScores.reduce((acc, q) => acc + q.score, 0) / quizScores.length);
  const totalCourses = courseProgress.length;
  const avgProgress = Math.round(courseProgress.reduce((acc, c) => acc + c.progress, 0) / totalCourses);

  return (
    <StudentLayout>
      <motion.div 
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <TrendingUp className="w-6 h-6 text-primary" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground">My Progress</h2>
          </div>
          <p className="text-muted-foreground">
            Track your learning journey and achievements
          </p>
        </motion.div>

        {/* Overview Stats */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
        >
          {[
            { label: "Overall Progress", value: `${avgProgress}%`, color: "text-primary", icon: TrendingUp },
            { label: "Average Quiz Score", value: `${avgScore}%`, color: "text-accent", icon: Target },
            { label: "Courses Enrolled", value: totalCourses, color: "text-primary", icon: BookOpen },
            { label: "Hours Learned", value: "47", color: "text-accent", icon: Flame },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card variant="default" className="overflow-hidden relative group cursor-pointer">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <CardContent className="p-5 text-center relative">
                  <motion.div
                    className="mx-auto mb-2"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <stat.icon className={`w-6 h-6 mx-auto ${stat.color}`} />
                  </motion.div>
                  <motion.p 
                    className={`text-4xl font-bold ${stat.color} mb-1`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Course Progress */}
          <motion.div variants={itemVariants}>
            <Card variant="elevated" className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Course Completion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {courseProgress.map((course, index) => (
                  <motion.div 
                    key={index} 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-foreground">{course.name}</span>
                      <motion.span 
                        className="text-muted-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        {course.progress}%
                      </motion.span>
                    </div>
                    <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${course.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                      />
                      {course.progress >= 80 && (
                        <motion.div
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 1.5 + index * 0.1, type: "spring" }}
                        >
                          <Sparkles className="w-3 h-3 text-accent" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quiz Scores */}
          <motion.div variants={itemVariants}>
            <Card variant="elevated" className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  Recent Quiz Scores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quizScores.map((quiz, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 cursor-pointer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5, backgroundColor: "hsl(var(--secondary))" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div>
                      <p className="font-medium text-foreground">{quiz.name}</p>
                      <p className="text-xs text-muted-foreground">{quiz.date}</p>
                    </div>
                    <motion.div 
                      className={`text-lg font-bold ${
                        quiz.score >= 90 ? "text-primary" : 
                        quiz.score >= 70 ? "text-accent" : "text-destructive"
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                    >
                      {quiz.score}%
                      {quiz.score >= 90 && (
                        <motion.span
                          className="ml-1"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                        >
                          🏆
                        </motion.span>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div variants={itemVariants}>
          <Card variant="glass" className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-xl text-center relative overflow-hidden ${
                        achievement.earned
                          ? "bg-primary/10 border border-primary/20"
                          : "bg-secondary/50 opacity-50"
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: achievement.earned ? 1 : 0.5, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                      whileHover={achievement.earned ? { scale: 1.05, y: -5 } : {}}
                      whileTap={achievement.earned ? { scale: 0.98 } : {}}
                    >
                      {achievement.earned && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      <motion.div 
                        className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center relative ${
                          achievement.earned ? "bg-primary/20" : "bg-muted"
                        }`}
                        whileHover={achievement.earned ? { rotate: 360 } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className={`w-6 h-6 ${
                          achievement.earned ? "text-primary" : "text-muted-foreground"
                        }`} />
                        {achievement.earned && (
                          <motion.div
                            className="absolute -top-1 -right-1"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <Sparkles className="w-4 h-4 text-accent" />
                          </motion.div>
                        )}
                      </motion.div>
                      <p className={`text-sm font-medium relative ${
                        achievement.earned ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {achievement.title}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </StudentLayout>
  );
};

export default StudentProgress;
