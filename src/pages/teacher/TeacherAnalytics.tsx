import { TeacherLayout } from "@/components/layouts/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, Users, BookOpen, Target, BarChart3, Sparkles } from "lucide-react";

const overviewStats = [
  { label: "Total Students", value: "324", change: "+12%", icon: Users, color: "text-primary", bg: "bg-primary/10" },
  { label: "Course Completions", value: "156", change: "+8%", icon: BookOpen, color: "text-accent", bg: "bg-accent/10" },
  { label: "Average Quiz Score", value: "78%", change: "+5%", icon: Target, color: "text-primary", bg: "bg-primary/10" },
  { label: "Engagement Rate", value: "72%", change: "+15%", icon: TrendingUp, color: "text-accent", bg: "bg-accent/10" },
];

const courseStats = [
  { name: "Machine Learning", students: 89, completionRate: 68, avgScore: 82 },
  { name: "Python Programming", students: 124, completionRate: 54, avgScore: 75 },
  { name: "Data Science", students: 67, completionRate: 82, avgScore: 88 },
  { name: "Web Development", students: 44, completionRate: 45, avgScore: 71 },
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

const TeacherAnalytics = () => {
  return (
    <TeacherLayout>
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
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <BarChart3 className="w-6 h-6 text-accent" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
          </div>
          <p className="text-muted-foreground">
            Track student progress and course performance
          </p>
        </motion.div>

        {/* Overview Stats */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
        >
          {overviewStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card variant="default" className="overflow-hidden relative group cursor-pointer">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <CardContent className="p-5 relative">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <motion.p 
                          className="text-2xl font-bold text-foreground"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                        >
                          {stat.value}
                        </motion.p>
                        <motion.p 
                          className="text-xs text-primary mt-1 flex items-center gap-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <TrendingUp className="w-3 h-3" />
                          {stat.change} this month
                        </motion.p>
                      </div>
                      <motion.div 
                        className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}
                        whileHover={{ rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Course Performance Table */}
        <motion.div variants={itemVariants}>
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                Course Performance
              </CardTitle>
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
                      <motion.tr 
                        key={index} 
                        className="border-b border-border/50 last:border-0 cursor-pointer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.3)" }}
                      >
                        <td className="py-4 px-4">
                          <p className="font-medium text-foreground">{course.name}</p>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <motion.span 
                            className="text-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            {course.students}
                          </motion.span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <motion.span 
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              course.completionRate >= 70 
                                ? "bg-primary/10 text-primary" 
                                : course.completionRate >= 50 
                                  ? "bg-accent/10 text-accent" 
                                  : "bg-muted text-muted-foreground"
                            }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                          >
                            {course.completionRate}%
                          </motion.span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <motion.span 
                            className={`font-medium flex items-center justify-center gap-1 ${
                              course.avgScore >= 80 ? "text-primary" : "text-foreground"
                            }`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            {course.avgScore}%
                            {course.avgScore >= 85 && (
                              <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                              >
                                <Sparkles className="w-4 h-4 text-accent" />
                              </motion.div>
                            )}
                          </motion.span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Visual Charts */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card variant="glass" className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Student Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center bg-secondary/30 rounded-xl relative overflow-hidden">
                  {/* Animated bars */}
                  <div className="flex items-end gap-3 h-32">
                    {[60, 80, 45, 90, 70, 85, 55].map((height, i) => (
                      <motion.div
                        key={i}
                        className="w-6 bg-gradient-to-t from-primary to-accent rounded-t-lg"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card variant="glass" className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  Quiz Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center bg-secondary/30 rounded-xl relative overflow-hidden">
                  {/* Animated line chart placeholder */}
                  <svg viewBox="0 0 200 100" className="w-full h-32">
                    <motion.path
                      d="M 10 80 L 40 60 L 70 70 L 100 40 L 130 50 L 160 30 L 190 35"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    />
                    <motion.path
                      d="M 10 90 L 40 75 L 70 85 L 100 55 L 130 65 L 160 45 L 190 50"
                      fill="none"
                      stroke="hsl(var(--accent))"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </TeacherLayout>
  );
};

export default TeacherAnalytics;
