import { TeacherLayout } from "@/components/layouts/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, TrendingUp, Clock, MoreVertical, Users, Sparkles } from "lucide-react";
import { useState } from "react";

const students = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.j@email.com",
    courses: ["Machine Learning", "Python"],
    progress: 78,
    lastActive: "2 hours ago",
    status: "active"
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.w@email.com",
    courses: ["Data Science"],
    progress: 92,
    lastActive: "1 hour ago",
    status: "active"
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@email.com",
    courses: ["Machine Learning", "Web Dev"],
    progress: 45,
    lastActive: "3 days ago",
    status: "slow"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "e.davis@email.com",
    courses: ["Python", "Data Science"],
    progress: 100,
    lastActive: "5 hours ago",
    status: "completed"
  },
  {
    id: 5,
    name: "James Wilson",
    email: "j.wilson@email.com",
    courses: ["Web Development"],
    progress: 32,
    lastActive: "1 week ago",
    status: "slow"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12
    }
  }
};

const TeacherStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-primary/10 text-primary border-0">Active</Badge>;
      case "slow":
        return <Badge variant="default" className="bg-accent/10 text-accent border-0">Slow Learner</Badge>;
      case "completed":
        return <Badge variant="default" className="bg-primary/10 text-primary border-0">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <TeacherLayout>
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <motion.div 
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Users className="w-6 h-6 text-accent" />
              </motion.div>
              <h2 className="text-2xl font-bold text-foreground">Students</h2>
            </div>
            <p className="text-muted-foreground">
              Monitor and manage your enrolled students
            </p>
          </div>
          <motion.p 
            className="text-sm text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {students.length} total students
          </motion.p>
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
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 transition-all focus:ring-2 focus:ring-accent/20"
          />
        </motion.div>

        {/* Students List */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Card variant="elevated">
            <CardContent className="p-0">
              <AnimatePresence>
                <div className="divide-y divide-border">
                  {filteredStudents.map((student, index) => (
                    <motion.div
                      key={student.id}
                      variants={itemVariants}
                      className="p-5 cursor-pointer"
                      whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.3)" }}
                      layout
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <motion.div 
                            className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <User className="w-6 h-6 text-primary" />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className="font-semibold text-foreground truncate">
                                {student.name}
                              </h4>
                              {getStatusBadge(student.status)}
                              {student.progress >= 90 && (
                                <motion.div
                                  animate={{ rotate: [0, 10, -10, 0] }}
                                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                                >
                                  <Sparkles className="w-4 h-4 text-accent" />
                                </motion.div>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {student.email}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.3 + index * 0.05 }}
                                >
                                  {student.progress}% progress
                                </motion.span>
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {student.lastActive}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="hidden sm:flex flex-wrap gap-1">
                            {student.courses.map((course, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                              >
                                <Badge variant="secondary" className="text-xs">
                                  {course}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {filteredStudents.length === 0 && (
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
            <p className="text-muted-foreground">No students found matching your search.</p>
          </motion.div>
        )}
      </motion.div>
    </TeacherLayout>
  );
};

export default TeacherStudents;
