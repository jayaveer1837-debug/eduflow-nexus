import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TeacherLayout } from "@/components/layouts/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Plus,
  BookOpen,
  Users,
  Clock,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Layers,
  Video,
  FileQuestion,
  Search,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Course {
  id: string;
  title: string;
  description: string;
  students: number;
  modules: number;
  status: "draft" | "published" | "archived";
  lastUpdated: string;
  thumbnail: string;
}

const initialCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of ML algorithms and applications",
    students: 89,
    modules: 8,
    status: "published",
    lastUpdated: "2 hours ago",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400",
  },
  {
    id: "2",
    title: "Advanced Python Programming",
    description: "Master advanced Python concepts and best practices",
    students: 124,
    modules: 12,
    status: "published",
    lastUpdated: "5 hours ago",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400",
  },
  {
    id: "3",
    title: "Data Science Fundamentals",
    description: "Comprehensive introduction to data science methodologies",
    students: 67,
    modules: 6,
    status: "draft",
    lastUpdated: "1 day ago",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
  },
];

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

const TeacherCourses = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCourse = () => {
    if (!newCourse.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a course title",
        variant: "destructive",
      });
      return;
    }

    const course: Course = {
      id: Date.now().toString(),
      title: newCourse.title,
      description: newCourse.description,
      students: 0,
      modules: 0,
      status: "draft",
      lastUpdated: "Just now",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
    };

    setCourses([course, ...courses]);
    setNewCourse({ title: "", description: "" });
    setIsCreateDialogOpen(false);

    toast({
      title: "Course created!",
      description: `"${course.title}" is ready. Add learning content to get started.`,
    });
  };

  const getStatusColor = (status: Course["status"]) => {
    switch (status) {
      case "published":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "draft":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "archived":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "";
    }
  };

  return (
    <TeacherLayout>
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Course Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Create and manage your courses with video-quiz linked modules
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Course
            </Button>
          </motion.div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div variants={itemVariants} className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </motion.div>

        {/* Stats Summary */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Courses", value: courses.length, icon: BookOpen },
            { label: "Published", value: courses.filter((c) => c.status === "published").length, icon: Eye },
            { label: "Draft", value: courses.filter((c) => c.status === "draft").length, icon: Edit },
            { label: "Total Students", value: courses.reduce((sum, c) => sum + c.students, 0), icon: Users },
          ].map((stat, index) => (
            <Card key={stat.label} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
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

        {/* Course Grid */}
        <motion.div
          variants={containerVariants}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -5 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/teacher/course/${course.id}`}>
                  <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm group cursor-pointer h-full">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <Badge
                        className={`absolute top-3 right-3 ${getStatusColor(course.status)}`}
                      >
                        {course.status}
                      </Badge>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/30">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Layers className="h-3 w-3" />
                            {course.modules} modules
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {course.students}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {course.lastUpdated}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? "Try adjusting your search query"
                : "Create your first course to get started"}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Course
              </Button>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Create Course Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>
              Start by adding basic course details. You'll add video-quiz modules next.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                placeholder="e.g., Introduction to Web Development"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of what students will learn..."
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                className="min-h-[100px]"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleCreateCourse} className="flex-1">
                Create Course
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TeacherLayout>
  );
};

export default TeacherCourses;
