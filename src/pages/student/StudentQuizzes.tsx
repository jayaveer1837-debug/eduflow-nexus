import { StudentLayout } from "@/components/layouts/StudentLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  FileQuestion, 
  Clock, 
  CheckCircle2, 
  Play, 
  Trophy,
  Target,
  Sparkles,
  Lock
} from "lucide-react";
import { Link } from "react-router-dom";

const quizzes: {
  id: number;
  title: string;
  course: string;
  questions: number;
  duration: string;
  status: string;
  score: number | null;
  dueDate: string | null;
}[] = [];

const stats = [
  { label: "Quizzes Completed", value: "0", icon: CheckCircle2, color: "text-primary" },
  { label: "Average Score", value: "-", icon: Target, color: "text-accent" },
  { label: "Best Score", value: "-", icon: Trophy, color: "text-primary" },
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

const StudentQuizzes = () => {
  const getStatusBadge = (status: string, score: number | null) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-primary/10 text-primary border-0 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {score}%
          </Badge>
        );
      case "available":
        return (
          <Badge className="bg-accent/10 text-accent border-0">
            Available
          </Badge>
        );
      case "locked":
        return (
          <Badge className="bg-muted text-muted-foreground border-0 flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Locked
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <StudentLayout>
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
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
            >
              <FileQuestion className="w-6 h-6 text-primary" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground">My Quizzes</h2>
          </div>
          <p className="text-muted-foreground">
            Test your knowledge and track your progress
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-3 gap-4"
          variants={containerVariants}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -3 }}
              >
                <Card variant="default" className="cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    >
                      <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                    </motion.div>
                    <motion.p 
                      className="text-2xl font-bold text-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quiz List */}
        <motion.div className="space-y-4" variants={containerVariants}>
          <h3 className="text-lg font-semibold text-foreground">Available Quizzes</h3>
          
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              variants={itemVariants}
              whileHover={{ scale: 1.01, x: 5 }}
            >
              <Card 
                variant="feature" 
                className={`overflow-hidden ${quiz.status === 'locked' ? 'opacity-60' : 'cursor-pointer'}`}
              >
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          quiz.status === 'completed' 
                            ? 'bg-primary/10' 
                            : quiz.status === 'available'
                              ? 'bg-accent/10'
                              : 'bg-muted'
                        }`}
                        whileHover={quiz.status !== 'locked' ? { rotate: 10 } : {}}
                      >
                        {quiz.status === 'completed' ? (
                          <Trophy className="w-6 h-6 text-primary" />
                        ) : quiz.status === 'available' ? (
                          <FileQuestion className="w-6 h-6 text-accent" />
                        ) : (
                          <Lock className="w-6 h-6 text-muted-foreground" />
                        )}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="font-semibold text-foreground">
                            {quiz.title}
                          </h4>
                          {getStatusBadge(quiz.status, quiz.score)}
                          {quiz.score && quiz.score >= 90 && (
                            <motion.div
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                            >
                              <Sparkles className="w-4 h-4 text-accent" />
                            </motion.div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {quiz.course}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <FileQuestion className="w-3 h-3" />
                            {quiz.questions} questions
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {quiz.duration}
                          </span>
                          {quiz.dueDate && (
                            <span className="text-accent font-medium">
                              Due: {quiz.dueDate}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {quiz.status !== 'locked' && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          variant={quiz.status === 'completed' ? 'outline' : 'accent'}
                          asChild
                        >
                          <Link to={`/student/quiz/${quiz.id}`}>
                            {quiz.status === 'completed' ? (
                              <>Review</>
                            ) : (
                              <>
                                <Play className="w-4 h-4" />
                                Start Quiz
                              </>
                            )}
                          </Link>
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </StudentLayout>
  );
};

export default StudentQuizzes;
