import React, { useState } from "react";
import { motion } from "framer-motion";
import { TeacherLayout } from "@/components/layouts/TeacherLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, FileQuestion, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";

interface Quiz {
  id: string;
  title: string;
  questions: number;
  attempts: number;
  avgScore: number;
  createdAt: string;
}

const quizzes: Quiz[] = [];

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

const TeacherQuizzes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              Quizzes
            </h1>
            <p className="text-muted-foreground mt-1">
              Create and manage quizzes for your courses
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/teacher/quiz/create">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Quiz
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div variants={itemVariants} className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quizzes..."
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
            { label: "Total Quizzes", value: quizzes.length },
            { label: "Total Questions", value: quizzes.reduce((sum, q) => sum + q.questions, 0) },
            { label: "Total Attempts", value: quizzes.reduce((sum, q) => sum + q.attempts, 0) },
            { label: "Avg Score", value: quizzes.length > 0 ? `${Math.round(quizzes.reduce((sum, q) => sum + q.avgScore, 0) / quizzes.length)}%` : "-" },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <FileQuestion className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FileQuestion className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            </motion.div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No quizzes yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchQuery
                ? "No quizzes match your search. Try a different query."
                : "Create your first quiz to test your students' knowledge and track their progress."}
            </p>
            {!searchQuery && (
              <Link to="/teacher/quiz/create">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Your First Quiz
                </Button>
              </Link>
            )}
          </motion.div>
        )}
      </motion.div>
    </TeacherLayout>
  );
};

export default TeacherQuizzes;
