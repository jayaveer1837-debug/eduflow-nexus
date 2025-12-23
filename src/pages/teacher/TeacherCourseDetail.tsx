import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { TeacherLayout } from "@/components/layouts/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  Video,
  FileQuestion,
  CheckCircle2,
  Clock,
  Users,
  Layers,
  Edit,
  Trash2,
  GripVertical,
  ChevronRight,
  AlertCircle,
  Lock,
  Unlock,
  ArrowLeft,
  BarChart3,
  Eye,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Module {
  id: string;
  title: string;
  videoTitle: string;
  videoDuration: string;
  quizQuestions: number;
  status: "draft" | "published";
  completionRate: number;
  order: number;
}

const courseData = {
  id: "1",
  title: "Introduction to Machine Learning",
  description: "Learn the fundamentals of ML algorithms and applications. This comprehensive course covers supervised learning, unsupervised learning, and practical implementations.",
  students: 89,
  status: "published" as const,
  modules: [
    {
      id: "m1",
      title: "Module 1: What is Machine Learning?",
      videoTitle: "Introduction to ML Concepts",
      videoDuration: "15:32",
      quizQuestions: 5,
      status: "published" as const,
      completionRate: 92,
      order: 1,
    },
    {
      id: "m2",
      title: "Module 2: Supervised Learning",
      videoTitle: "Understanding Supervised Learning",
      videoDuration: "22:15",
      quizQuestions: 8,
      status: "published" as const,
      completionRate: 78,
      order: 2,
    },
    {
      id: "m3",
      title: "Module 3: Classification Algorithms",
      videoTitle: "Decision Trees and Random Forests",
      videoDuration: "28:45",
      quizQuestions: 6,
      status: "draft" as const,
      completionRate: 0,
      order: 3,
    },
  ] as Module[],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const TeacherCourseDetail = () => {
  const { id } = useParams();
  const [modules, setModules] = useState<Module[]>(courseData.modules);

  const publishedModules = modules.filter((m) => m.status === "published").length;
  const avgCompletion = modules.length > 0
    ? Math.round(modules.reduce((sum, m) => sum + m.completionRate, 0) / modules.length)
    : 0;

  const handleDeleteModule = (moduleId: string) => {
    setModules(modules.filter((m) => m.id !== moduleId));
    toast({
      title: "Module deleted",
      description: "The module has been removed from this course.",
    });
  };

  return (
    <TeacherLayout>
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button & Header */}
        <motion.div variants={itemVariants}>
          <Link
            to="/teacher/courses"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {courseData.title}
                </h1>
                <Badge
                  className={
                    courseData.status === "published"
                      ? "bg-green-500/10 text-green-500 border-green-500/20"
                      : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                  }
                >
                  {courseData.status}
                </Badge>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                {courseData.description}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Course
              </Button>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild className="gap-2">
                  <Link to={`/teacher/course/${id}/content/new`}>
                    <Plus className="h-4 w-4" />
                    Add Learning Content
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Modules", value: modules.length, icon: Layers, color: "text-primary" },
            { label: "Published", value: publishedModules, icon: CheckCircle2, color: "text-green-500" },
            { label: "Enrolled Students", value: courseData.students, icon: Users, color: "text-blue-500" },
            { label: "Avg. Completion", value: `${avgCompletion}%`, icon: BarChart3, color: "text-amber-500" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Important Notice */}
        <motion.div variants={itemVariants}>
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Video-Quiz Linked Learning</p>
                <p className="text-sm text-muted-foreground">
                  Each module requires both a video and a linked quiz. Students must complete the video
                  before taking the quiz, and the quiz must be passed to unlock the next module.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Module List */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Learning Modules</h2>
            <p className="text-sm text-muted-foreground">
              {publishedModules} of {modules.length} published
            </p>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <Card
                    className={`border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden ${
                      module.status === "draft" ? "border-amber-500/30" : ""
                    }`}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-stretch">
                        {/* Drag Handle & Order */}
                        <div className="flex items-center gap-2 px-4 bg-muted/30 border-r border-border/30">
                          <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                          <span className="text-lg font-bold text-muted-foreground">
                            {module.order}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-foreground">
                                  {module.title}
                                </h3>
                                <Badge
                                  variant="outline"
                                  className={
                                    module.status === "published"
                                      ? "bg-green-500/10 text-green-500 border-green-500/20"
                                      : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                  }
                                >
                                  {module.status === "published" ? (
                                    <><Unlock className="h-3 w-3 mr-1" /> Published</>
                                  ) : (
                                    <><Lock className="h-3 w-3 mr-1" /> Draft</>
                                  )}
                                </Badge>
                              </div>

                              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Video className="h-4 w-4 text-primary" />
                                  {module.videoTitle}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {module.videoDuration}
                                </span>
                                <span className="flex items-center gap-1">
                                  <FileQuestion className="h-4 w-4 text-primary" />
                                  {module.quizQuestions} questions
                                </span>
                              </div>

                              {module.status === "published" && (
                                <div className="mt-3">
                                  <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-muted-foreground">Student Completion</span>
                                    <span className="font-medium text-foreground">{module.completionRate}%</span>
                                  </div>
                                  <Progress value={module.completionRate} className="h-1.5" />
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" className="gap-1">
                                <Eye className="h-4 w-4" />
                                Preview
                              </Button>
                              <Button variant="outline" size="sm" className="gap-1">
                                <Edit className="h-4 w-4" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={() => handleDeleteModule(module.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {modules.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 border-2 border-dashed border-border rounded-xl"
            >
              <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No modules yet</h3>
              <p className="text-muted-foreground mb-4">
                Add your first learning module with video and quiz
              </p>
              <Button asChild>
                <Link to={`/teacher/course/${id}/content/new`}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Learning Content
                </Link>
              </Button>
            </motion.div>
          )}

          {/* Add More Button */}
          {modules.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="flex justify-center pt-4"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  asChild
                  className="border-dashed border-2 gap-2"
                >
                  <Link to={`/teacher/course/${id}/content/new`}>
                    <Plus className="h-5 w-5" />
                    Add Another Module
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </TeacherLayout>
  );
};

export default TeacherCourseDetail;
