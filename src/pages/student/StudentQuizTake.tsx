import { useState, useEffect } from "react";
import { StudentLayout } from "@/components/layouts/StudentLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  CheckCircle2,
  XCircle,
  Trophy,
  Sparkles,
  RotateCcw,
  Home
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const quizData = {
  id: 2,
  title: "Python Data Structures",
  course: "Advanced Python Programming",
  questions: [
    {
      id: 1,
      question: "What is the time complexity of accessing an element in a Python list by index?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      correct: 0
    },
    {
      id: 2,
      question: "Which data structure uses LIFO (Last In, First Out) principle?",
      options: ["Queue", "Stack", "Linked List", "Tree"],
      correct: 1
    },
    {
      id: 3,
      question: "What is the main advantage of using a dictionary in Python?",
      options: ["Ordered elements", "Fast key-based lookup", "Memory efficiency", "Thread safety"],
      correct: 1
    },
    {
      id: 4,
      question: "Which method is used to add an element to the end of a list?",
      options: ["add()", "insert()", "append()", "push()"],
      correct: 2
    },
    {
      id: 5,
      question: "What is the output of len({1, 2, 2, 3, 3, 3})?",
      options: ["6", "3", "4", "Error"],
      correct: 1
    },
  ]
};

const questionVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 }
  })
};

const optionVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1 + i * 0.1,
      type: "spring" as const,
      stiffness: 100,
      damping: 12
    }
  })
};

const StudentQuizTake = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quizData.questions.length).fill(null)
  );
  const [direction, setDirection] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Timer
  useEffect(() => {
    if (isCompleted) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsCompleted(true);
          setShowResult(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (optionIndex: number) => {
    if (isCompleted) return;
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const goToQuestion = (index: number) => {
    setDirection(index > currentQuestion ? 1 : -1);
    setCurrentQuestion(index);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setDirection(1);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = () => {
    setIsCompleted(true);
    setShowResult(true);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData.questions[index].correct) {
        correct++;
      }
    });
    return Math.round((correct / quizData.questions.length) * 100);
  };

  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
  const answeredCount = answers.filter(a => a !== null).length;

  if (showResult) {
    const score = calculateScore();
    const passed = score >= 70;

    return (
      <StudentLayout>
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card variant="elevated" className="overflow-hidden">
            <CardContent className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                {passed ? (
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-12 h-12 text-primary" />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <RotateCcw className="w-12 h-12 text-accent" />
                  </div>
                )}
              </motion.div>

              <motion.h2 
                className="text-2xl font-bold text-foreground mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {passed ? "Congratulations!" : "Keep Learning!"}
              </motion.h2>

              <motion.p 
                className="text-muted-foreground mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {passed 
                  ? "You've successfully completed the quiz!" 
                  : "You can review and try again to improve your score."}
              </motion.p>

              <motion.div 
                className="relative w-32 h-32 mx-auto mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="hsl(var(--secondary))"
                    strokeWidth="12"
                    fill="none"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke={passed ? "hsl(var(--primary))" : "hsl(var(--accent))"}
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: score / 100 }}
                    transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                    style={{
                      strokeDasharray: "352",
                      strokeDashoffset: "0"
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span 
                    className={`text-3xl font-bold ${passed ? 'text-primary' : 'text-accent'}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                  >
                    {score}%
                  </motion.span>
                </div>
              </motion.div>

              {/* Question Results */}
              <motion.div 
                className="grid grid-cols-5 gap-2 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {quizData.questions.map((q, index) => {
                  const isCorrect = answers[index] === q.correct;
                  return (
                    <motion.div
                      key={index}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isCorrect 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-destructive/10 text-destructive'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <XCircle className="w-5 h-5" />
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div 
                className="flex gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Button variant="outline" onClick={() => navigate('/student/quizzes')}>
                  <Home className="w-4 h-4" />
                  Back to Quizzes
                </Button>
                {!passed && (
                  <Button 
                    variant="accent" 
                    onClick={() => {
                      setAnswers(new Array(quizData.questions.length).fill(null));
                      setCurrentQuestion(0);
                      setTimeLeft(20 * 60);
                      setIsCompleted(false);
                      setShowResult(false);
                    }}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Try Again
                  </Button>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <motion.div 
        className="max-w-3xl mx-auto space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <motion.div 
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h2 className="text-xl font-bold text-foreground">{quizData.title}</h2>
            <p className="text-sm text-muted-foreground">{quizData.course}</p>
          </div>
          <motion.div 
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              timeLeft < 60 ? 'bg-destructive/10 text-destructive' : 'bg-secondary'
            }`}
            animate={timeLeft < 60 ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, repeat: timeLeft < 60 ? Infinity : 0 }}
          >
            <Clock className="w-4 h-4" />
            <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
          </motion.div>
        </motion.div>

        {/* Progress */}
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Question {currentQuestion + 1} of {quizData.questions.length}
            </span>
            <span className="text-muted-foreground">
              {answeredCount} answered
            </span>
          </div>
          <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Question Navigation Dots */}
        <motion.div 
          className="flex flex-wrap gap-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {quizData.questions.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToQuestion(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                index === currentQuestion
                  ? 'bg-primary text-primary-foreground'
                  : answers[index] !== null
                    ? 'bg-primary/20 text-primary'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {index + 1}
            </motion.button>
          ))}
        </motion.div>

        {/* Question Card */}
        <div className="relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion}
              custom={direction}
              variants={questionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <Card variant="elevated">
                <CardContent className="p-6 sm:p-8">
                  <motion.h3 
                    className="text-lg sm:text-xl font-semibold text-foreground mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {quizData.questions[currentQuestion].question}
                  </motion.h3>

                  <div className="space-y-3">
                    {quizData.questions[currentQuestion].options.map((option, index) => {
                      const isSelected = answers[currentQuestion] === index;
                      return (
                        <motion.button
                          key={index}
                          custom={index}
                          variants={optionVariants}
                          initial="hidden"
                          animate="visible"
                          onClick={() => handleAnswer(index)}
                          className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                            isSelected
                              ? 'border-primary bg-primary/10 text-foreground'
                              : 'border-border bg-card hover:border-primary/50 hover:bg-secondary/50 text-foreground'
                          }`}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-3">
                            <motion.div 
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isSelected
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-secondary text-muted-foreground'
                              }`}
                              animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                              transition={{ duration: 0.3 }}
                            >
                              {String.fromCharCode(65 + index)}
                            </motion.div>
                            <span className="flex-1">{option}</span>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500 }}
                              >
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                              </motion.div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
          </motion.div>

          {currentQuestion === quizData.questions.length - 1 ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="accent"
                onClick={submitQuiz}
                disabled={answeredCount < quizData.questions.length}
                className="relative"
              >
                {answeredCount === quizData.questions.length && (
                  <motion.span
                    className="absolute -top-1 -right-1"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4 text-accent" />
                  </motion.span>
                )}
                Submit Quiz
              </Button>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="default" onClick={nextQuestion}>
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </StudentLayout>
  );
};

export default StudentQuizTake;
