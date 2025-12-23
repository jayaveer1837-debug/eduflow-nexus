import { StudentLayout } from "@/components/layouts/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { MessageCircle, Search, Users, Clock, ThumbsUp, MessageSquare } from "lucide-react";
import { useState } from "react";

const discussions = [
  {
    id: 1,
    title: "Help understanding backpropagation in neural networks",
    course: "Introduction to Machine Learning",
    author: "Sarah M.",
    replies: 12,
    likes: 24,
    lastActivity: "2 hours ago",
    isHot: true
  },
  {
    id: 2,
    title: "Best practices for Python list comprehensions?",
    course: "Advanced Python Programming",
    author: "John D.",
    replies: 8,
    likes: 15,
    lastActivity: "5 hours ago",
    isHot: false
  },
  {
    id: 3,
    title: "Struggling with SQL JOIN operations",
    course: "Database Design Principles",
    author: "Emily W.",
    replies: 5,
    likes: 10,
    lastActivity: "1 day ago",
    isHot: false
  },
  {
    id: 4,
    title: "CSS Flexbox vs Grid - when to use which?",
    course: "Web Development Fundamentals",
    author: "Michael C.",
    replies: 18,
    likes: 32,
    lastActivity: "3 hours ago",
    isHot: true
  },
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

const StudentDiscussions = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDiscussions = discussions.filter(d =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <StudentLayout>
      <motion.div 
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MessageCircle className="w-6 h-6 text-primary" />
              </motion.div>
              <h2 className="text-2xl font-bold text-foreground">Discussions</h2>
            </div>
            <p className="text-muted-foreground">
              Connect with fellow students and get help
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="accent">
              <MessageSquare className="w-4 h-4" />
              New Discussion
            </Button>
          </motion.div>
        </motion.div>

        {/* Search */}
        <motion.div 
          className="relative max-w-md"
          variants={itemVariants}
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12"
          />
        </motion.div>

        {/* Discussions List */}
        <motion.div className="space-y-4" variants={containerVariants}>
          {filteredDiscussions.map((discussion, index) => (
            <motion.div
              key={discussion.id}
              variants={itemVariants}
              whileHover={{ scale: 1.01, x: 5 }}
            >
              <Card variant="feature" className="cursor-pointer overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 10 }}
                    >
                      <Users className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-semibold text-foreground hover:text-primary transition-colors">
                          {discussion.title}
                        </h4>
                        {discussion.isHot && (
                          <motion.span 
                            className="px-2 py-0.5 text-xs bg-accent/10 text-accent rounded-full"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            🔥 Hot
                          </motion.span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {discussion.course} • by {discussion.author}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {discussion.replies} replies
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {discussion.likes} likes
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {discussion.lastActivity}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredDiscussions.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No discussions found.</p>
          </motion.div>
        )}
      </motion.div>
    </StudentLayout>
  );
};

export default StudentDiscussions;
