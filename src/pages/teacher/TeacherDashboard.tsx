import { TeacherLayout } from "@/components/layouts/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  FileQuestion,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2,
  Sparkles,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Active Courses", value: "8", icon: BookOpen, color: "text-accent", bg: "bg-accent/10" },
  { label: "Total Students", value: "324", icon: Users, color: "text-primary", bg: "bg-primary/10" },
  { label: "Avg. Completion", value: "72%", icon: TrendingUp, color: "text-accent", bg: "bg-accent/10" },
  { label: "Pending Quizzes", value: "12", icon: FileQuestion, color: "text-primary", bg: "bg-primary/10" },
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

const TeacherDashboard = () => {
  return (
    <TeacherLayout>
      <motion.div 
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Message */}
        <motion.div 
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          variants={itemVariants}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
              >
                <Zap className="w-6 h-6 text-accent" />
              </motion.div>
              <h2 className="text-2xl font-bold text-foreground">
                Welcome back, Professor!
              </h2>
            </div>
            <p className="text-muted-foreground">
              Here's what's happening with your courses today.
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="accent" asChild>
              <Link to="/instructor/courses">
                <Plus className="w-4 h-4" />
                Create Course
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
        >
          {stats.map((stat, index) => {
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
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}
                        whileHover={{ rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </motion.div>
                      <div>
                        <motion.p 
                          className="text-2xl font-bold text-foreground"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                        >
                          {stat.value}
                        </motion.p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Course Overview */}
          <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Your Courses</h3>
              <Button variant="ghost" size="sm" asChild className="group">
                <Link to="/instructor/courses">
                  View all
                  <motion.div
                    className="ml-1"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {myCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <Card variant="feature" className="cursor-pointer group">
                    <CardContent className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                            {course.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button variant="subtle" size="sm">
                            Manage
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <motion.div variants={itemVariants}>
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 cursor-pointer"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.02, backgroundColor: "hsl(var(--secondary))" }}
                    >
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-accent mt-2"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{activity.text}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Pending Actions */}
            <Card variant="elevated" className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Clock className="w-5 h-5 text-accent" />
                  </motion.div>
                  Pending Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingActions.map((action, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-accent/5 border border-accent/10 cursor-pointer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{action.title}</p>
                      <p className="text-xs text-accent">{action.deadline}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { to: "/instructor/upload", icon: Plus, text: "Upload Content" },
                    { to: "/instructor/quizzes", icon: FileQuestion, text: "Create Quiz" },
                    { to: "/instructor/analytics", icon: TrendingUp, text: "View Analytics" },
                  ].map((action, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link to={action.to}>
                          <action.icon className="w-4 h-4" />
                          {action.text}
                        </Link>
                      </Button>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </TeacherLayout>
  );
};

export default TeacherDashboard;
