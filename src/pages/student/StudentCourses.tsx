import { StudentLayout } from "@/components/layouts/StudentLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PlayCircle, Clock, BookOpen, Sparkles } from "lucide-react";
import { useState } from "react";

const allCourses: {
  id: number;
  title: string;
  teacher: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  duration: string;
  thumbnail: string;
}[] = [];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

const StudentCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = allCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <StudentLayout>
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <BookOpen className="w-6 h-6 text-primary" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground">My Courses</h2>
          </div>
          <p className="text-muted-foreground">
            Continue learning from where you left off
          </p>
        </motion.div>

        {/* Search */}
        <motion.div 
          className="relative max-w-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            animate={{ x: [0, 2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </motion.div>
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 transition-all focus:ring-2 focus:ring-primary/20"
          />
        </motion.div>

        {/* Courses Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                layout
                exit="exit"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Card variant="feature" className="overflow-hidden cursor-pointer group">
                    <div className="aspect-video relative overflow-hidden">
                      <motion.img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent"
                        initial={{ opacity: 0.6 }}
                        whileHover={{ opacity: 0.8 }}
                      />
                      <motion.button 
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <motion.div 
                          className="w-16 h-16 rounded-full bg-primary-foreground/90 flex items-center justify-center shadow-lg"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <PlayCircle className="w-10 h-10 text-primary" />
                        </motion.div>
                      </motion.button>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-primary-foreground text-sm">
                        <motion.span 
                          className="flex items-center gap-1 bg-foreground/30 backdrop-blur-sm px-2 py-1 rounded-full"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </motion.span>
                        <motion.span 
                          className="flex items-center gap-1 bg-foreground/30 backdrop-blur-sm px-2 py-1 rounded-full"
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <BookOpen className="w-4 h-4" />
                          {course.totalModules} modules
                        </motion.span>
                      </div>
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
                          <motion.span 
                            className="font-medium text-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            {course.progress}%
                          </motion.span>
                        </div>
                        <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                          />
                          {course.progress >= 80 && (
                            <motion.div
                              className="absolute right-1 top-1/2 -translate-y-1/2"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 1.5, type: "spring" }}
                            >
                              <Sparkles className="w-3 h-3 text-accent" />
                            </motion.div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {course.completedModules} of {course.totalModules} modules completed
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button variant="subtle" className="w-full mt-4 group">
                          <span className="group-hover:mr-2 transition-all">Continue Learning</span>
                          <motion.span
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredCourses.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            </motion.div>
            <p className="text-muted-foreground">No courses found matching your search.</p>
          </motion.div>
        )}
      </motion.div>
    </StudentLayout>
  );
};

export default StudentCourses;
