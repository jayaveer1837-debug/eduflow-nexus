import { StudentLayout } from "@/components/layouts/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Trophy,
  ArrowRight,
  PlayCircle,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

const enrolledCourses = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    teacher: "Dr. Sarah Chen",
    progress: 65,
    totalModules: 12,
    completedModules: 8,
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Web Development Fundamentals",
    teacher: "Prof. Michael Brown",
    progress: 42,
    totalModules: 10,
    completedModules: 4,
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    teacher: "Dr. Emily White",
    progress: 28,
    totalModules: 15,
    completedModules: 4,
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop"
  }
];

const stats = [
  { label: "Courses Enrolled", value: "5", icon: BookOpen, color: "text-primary", bg: "bg-primary/10" },
  { label: "Hours Learned", value: "47", icon: Clock, color: "text-accent", bg: "bg-accent/10" },
  { label: "Quizzes Completed", value: "23", icon: Trophy, color: "text-primary", bg: "bg-primary/10" },
  { label: "Average Score", value: "87%", icon: TrendingUp, color: "text-accent", bg: "bg-accent/10" },
];

const recommendations = [
  { title: "Advanced Python Programming", category: "Programming" },
  { title: "Database Design Principles", category: "Data" },
  { title: "UI/UX Design Basics", category: "Design" },
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

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -5,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 17
    }
  }
};

const StudentDashboard = () => {
  return (
    <StudentLayout>
      <motion.div 
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Message */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground">
              Welcome back, Alex!
            </h2>
          </div>
          <p className="text-muted-foreground">
            Continue your learning journey. You're doing great!
          </p>
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
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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

        {/* Enrolled Courses */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">My Courses</h3>
            <Button variant="ghost" size="sm" asChild className="group">
              <Link to="/student/courses">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course, index) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.div variants={cardHover}>
                  <Card variant="feature" className="overflow-hidden cursor-pointer group">
                    <div className="aspect-video relative overflow-hidden">
                      <motion.img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                      <motion.button 
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <motion.div 
                          className="w-14 h-14 rounded-full bg-primary-foreground/90 flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <PlayCircle className="w-8 h-8 text-primary" />
                        </motion.div>
                      </motion.button>
                    </div>
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {course.teacher}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium text-foreground">{course.progress}%</span>
                        </div>
                        <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {course.completedModules} of {course.totalModules} modules
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div variants={itemVariants}>
          <Card variant="glass" className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Recommended for You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-xl bg-secondary/50 cursor-pointer"
                    whileHover={{ 
                      scale: 1.03, 
                      backgroundColor: "hsl(var(--secondary))",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <motion.p 
                      className="text-xs text-primary font-medium mb-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      {rec.category}
                    </motion.p>
                    <p className="font-medium text-foreground">{rec.title}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </StudentLayout>
  );
};

export default StudentDashboard;
