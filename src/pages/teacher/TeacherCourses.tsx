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
  youtubeUrl: string;
  students: number;
  modules: number;
  status: "draft" | "published" | "archived";
  lastUpdated: string;
  thumbnail: string;
}

// Extract YouTube video ID from various URL formats
const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Get YouTube thumbnail URL from video ID
const getYouTubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

const initialCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of ML algorithms and applications",
    youtubeUrl: "https://www.youtube.com/watch?v=ukzFI9rgwfU",
    students: 89,
    modules: 8,
    status: "published",
    lastUpdated: "2 hours ago",
    thumbnail: "https://img.youtube.com/vi/ukzFI9rgwfU/maxresdefault.jpg",
  },
  {
    id: "2",
    title: "Advanced Python Programming",
    description: "Master advanced Python concepts and best practices",
    youtubeUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    students: 124,
    modules: 12,
    status: "published",
    lastUpdated: "5 hours ago",
    thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg",
  },
  {
    id: "3",
    title: "Data Science Fundamentals",
    description: "Comprehensive introduction to data science methodologies",
    youtubeUrl: "https://www.youtube.com/watch?v=ua-CiDNNj30",
    students: 67,
    modules: 6,
    status: "draft",
    lastUpdated: "1 day ago",
    thumbnail: "https://img.youtube.com/vi/ua-CiDNNj30/maxresdefault.jpg",
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
  const [newCourse, setNewCourse] = useState({ title: "", description: "", youtubeUrl: "" });
  const [youtubePreview, setYoutubePreview] = useState<{ videoId: string; thumbnail: string } | null>(null);

  const handleYoutubeUrlChange = (url: string) => {
    setNewCourse({ ...newCourse, youtubeUrl: url });
    const videoId = extractYouTubeId(url);
    if (videoId) {
      setYoutubePreview({
        videoId,
        thumbnail: getYouTubeThumbnail(videoId),
      });
    } else {
      setYoutubePreview(null);
    }
  };

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

    if (!youtubePreview) {
      toast({
        title: "YouTube link required",
        description: "Please enter a valid YouTube video link",
        variant: "destructive",
      });
      return;
    }

    const course: Course = {
      id: Date.now().toString(),
      title: newCourse.title,
      description: newCourse.description,
      youtubeUrl: newCourse.youtubeUrl,
      students: 0,
      modules: 0,
      status: "draft",
      lastUpdated: "Just now",
      thumbnail: youtubePreview.thumbnail,
    };

    setCourses([course, ...courses]);
    setNewCourse({ title: "", description: "", youtubeUrl: "" });
    setYoutubePreview(null);
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
                <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm group cursor-pointer h-full">
                  <a
                    href={course.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="block aspect-video relative overflow-hidden"
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                        <Video className="h-8 w-8 text-white ml-1" />
                      </div>
                    </div>
                    <Badge
                      className={`absolute top-3 right-3 ${getStatusColor(course.status)}`}
                    >
                      {course.status}
                    </Badge>
                  </a>
                  <Link to={`/teacher/course/${course.id}`}>
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
                  </Link>
                </Card>
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
      <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
        setIsCreateDialogOpen(open);
        if (!open) {
          setNewCourse({ title: "", description: "", youtubeUrl: "" });
          setYoutubePreview(null);
        }
      }}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>
              Add a YouTube video link to get started. The thumbnail will be fetched automatically.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4 pb-2">
            {/* YouTube URL Input */}
            <div className="space-y-2">
              <Label htmlFor="youtube-url" className="flex items-center gap-2">
                <Video className="h-4 w-4 text-red-500" />
                YouTube Video Link
              </Label>
              <Input
                id="youtube-url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={newCourse.youtubeUrl}
                onChange={(e) => handleYoutubeUrlChange(e.target.value)}
              />
              {newCourse.youtubeUrl && !youtubePreview && (
                <p className="text-xs text-destructive">Invalid YouTube URL. Please enter a valid link.</p>
              )}
            </div>

            {/* YouTube Thumbnail Preview */}
            <AnimatePresence>
              {youtubePreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <Label className="text-xs text-muted-foreground">Video Preview</Label>
                  <a
                    href={newCourse.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative aspect-video rounded-lg overflow-hidden group cursor-pointer border border-border"
                  >
                    <img
                      src={youtubePreview.thumbnail}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback to hqdefault if maxresdefault doesn't exist
                        e.currentTarget.src = `https://img.youtube.com/vi/${youtubePreview.videoId}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-xl">
                        <Video className="h-7 w-7 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      Click to open in YouTube
                    </div>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Course Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                placeholder="e.g., Introduction to Web Development"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of what students will learn..."
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                className="min-h-[80px]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleCreateCourse} 
                className="flex-1"
                disabled={!youtubePreview || !newCourse.title.trim()}
              >
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
