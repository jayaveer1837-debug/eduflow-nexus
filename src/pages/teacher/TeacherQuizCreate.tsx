import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TeacherLayout } from "@/components/layouts/TeacherLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  GripVertical,
  Save,
  Eye,
  CheckCircle2,
  X,
  Clock,
  FileQuestion,
  Settings,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import QuizPreviewModal from "@/components/quiz/QuizPreviewModal";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
  points: number;
}

interface QuizSettings {
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  shuffleQuestions: boolean;
  showResults: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
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

const questionVariants = {
  hidden: { opacity: 0, scale: 0.95, x: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    x: 20,
    transition: { duration: 0.2 },
  },
};

const TeacherQuizCreate = () => {
  const [settings, setSettings] = useState<QuizSettings>({
    title: "",
    description: "",
    timeLimit: 30,
    passingScore: 70,
    shuffleQuestions: false,
    showResults: true,
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      text: "",
      options: [
        { id: "1a", text: "", isCorrect: true },
        { id: "1b", text: "", isCorrect: false },
        { id: "1c", text: "", isCorrect: false },
        { id: "1d", text: "", isCorrect: false },
      ],
      points: 10,
    },
  ]);

  const [activeTab, setActiveTab] = useState<"questions" | "settings">("questions");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const addQuestion = () => {
    const newId = Date.now().toString();
    setQuestions([
      ...questions,
      {
        id: newId,
        text: "",
        options: [
          { id: `${newId}a`, text: "", isCorrect: true },
          { id: `${newId}b`, text: "", isCorrect: false },
          { id: `${newId}c`, text: "", isCorrect: false },
          { id: `${newId}d`, text: "", isCorrect: false },
        ],
        points: 10,
      },
    ]);
  };

  const removeQuestion = (questionId: string) => {
    if (questions.length === 1) {
      toast({
        title: "Cannot remove",
        description: "Quiz must have at least one question",
        variant: "destructive",
      });
      return;
    }
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const updateQuestionText = (questionId: string, text: string) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, text } : q))
    );
  };

  const updateOptionText = (
    questionId: string,
    optionId: string,
    text: string
  ) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) =>
                o.id === optionId ? { ...o, text } : o
              ),
            }
          : q
      )
    );
  };

  const setCorrectOption = (questionId: string, optionId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o) => ({
                ...o,
                isCorrect: o.id === optionId,
              })),
            }
          : q
      )
    );
  };

  const updateQuestionPoints = (questionId: string, points: number) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, points } : q))
    );
  };

  const addOption = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (question && question.options.length >= 6) {
      toast({
        title: "Maximum options reached",
        description: "A question can have at most 6 options",
        variant: "destructive",
      });
      return;
    }

    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [
                ...q.options,
                { id: `${questionId}${Date.now()}`, text: "", isCorrect: false },
              ],
            }
          : q
      )
    );
  };

  const removeOption = (questionId: string, optionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (question && question.options.length <= 2) {
      toast({
        title: "Cannot remove",
        description: "A question must have at least 2 options",
        variant: "destructive",
      });
      return;
    }

    const option = question?.options.find((o) => o.id === optionId);
    if (option?.isCorrect) {
      toast({
        title: "Cannot remove",
        description: "Cannot remove the correct answer. Set another option as correct first.",
        variant: "destructive",
      });
      return;
    }

    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.filter((o) => o.id !== optionId) }
          : q
      )
    );
  };

  const handleSaveQuiz = () => {
    if (!settings.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a quiz title",
        variant: "destructive",
      });
      return;
    }

    const emptyQuestions = questions.filter((q) => !q.text.trim());
    if (emptyQuestions.length > 0) {
      toast({
        title: "Empty questions",
        description: "Please fill in all question texts",
        variant: "destructive",
      });
      return;
    }

    const questionsWithEmptyOptions = questions.filter((q) =>
      q.options.some((o) => !o.text.trim())
    );
    if (questionsWithEmptyOptions.length > 0) {
      toast({
        title: "Empty options",
        description: "Please fill in all option texts",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Quiz saved!",
      description: `"${settings.title}" with ${questions.length} questions has been saved.`,
    });
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

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
              Create New Quiz
            </h1>
            <p className="text-muted-foreground mt-1">
              Build an interactive quiz with multiple choice questions
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" onClick={() => setIsPreviewOpen(true)}>
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button onClick={handleSaveQuiz} className="gap-2">
                <Save className="h-4 w-4" />
                Save Quiz
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            {
              label: "Questions",
              value: questions.length,
              icon: FileQuestion,
              color: "text-primary",
            },
            {
              label: "Total Points",
              value: totalPoints,
              icon: CheckCircle2,
              color: "text-green-500",
            },
            {
              label: "Time Limit",
              value: `${settings.timeLimit}m`,
              icon: Clock,
              color: "text-amber-500",
            },
            {
              label: "Pass Score",
              value: `${settings.passingScore}%`,
              icon: Settings,
              color: "text-blue-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div variants={itemVariants} className="flex gap-2">
          {(["questions", "settings"] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab === "questions" ? "Questions" : "Settings"}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "questions" ? (
            <motion.div
              key="questions"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <AnimatePresence>
                {questions.map((question, qIndex) => (
                  <motion.div
                    key={question.id}
                    variants={questionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
                      <CardHeader className="pb-4 border-b border-border/30">
                        <div className="flex items-start gap-3">
                          <motion.div
                            className="mt-1 cursor-grab"
                            whileHover={{ scale: 1.1 }}
                          >
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                          </motion.div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-primary">
                                Question {qIndex + 1}
                              </span>
                              <div className="flex items-center gap-2">
                                <Input
                                  type="number"
                                  value={question.points}
                                  onChange={(e) =>
                                    updateQuestionPoints(
                                      question.id,
                                      parseInt(e.target.value) || 0
                                    )
                                  }
                                  className="w-20 h-8 text-center"
                                  min={1}
                                />
                                <span className="text-sm text-muted-foreground">
                                  pts
                                </span>
                                <motion.button
                                  onClick={() => removeQuestion(question.id)}
                                  className="p-1.5 rounded-md hover:bg-destructive/10 text-destructive transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </motion.button>
                              </div>
                            </div>
                            <Textarea
                              placeholder="Enter your question..."
                              value={question.text}
                              onChange={(e) =>
                                updateQuestionText(question.id, e.target.value)
                              }
                              className="min-h-[80px] resize-none bg-background/50"
                            />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-3">
                        <Label className="text-sm text-muted-foreground">
                          Answer Options (click to mark as correct)
                        </Label>
                        <div className="grid gap-3">
                          {question.options.map((option, oIndex) => (
                            <motion.div
                              key={option.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: oIndex * 0.05 }}
                              className="flex items-center gap-3"
                            >
                              <motion.button
                                onClick={() =>
                                  setCorrectOption(question.id, option.id)
                                }
                                className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                                  option.isCorrect
                                    ? "border-green-500 bg-green-500/20 text-green-500"
                                    : "border-border hover:border-primary/50"
                                }`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                {option.isCorrect && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 500,
                                      damping: 30,
                                    }}
                                  >
                                    <CheckCircle2 className="h-5 w-5" />
                                  </motion.div>
                                )}
                              </motion.button>
                              <Input
                                placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                                value={option.text}
                                onChange={(e) =>
                                  updateOptionText(
                                    question.id,
                                    option.id,
                                    e.target.value
                                  )
                                }
                                className={`flex-1 ${
                                  option.isCorrect
                                    ? "border-green-500/50 bg-green-500/5"
                                    : ""
                                }`}
                              />
                              <motion.button
                                onClick={() => removeOption(question.id, option.id)}
                                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <X className="h-4 w-4" />
                              </motion.button>
                            </motion.div>
                          ))}
                        </div>
                        <motion.button
                          onClick={() => addOption(question.id)}
                          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mt-2"
                          whileHover={{ x: 5 }}
                        >
                          <Plus className="h-4 w-4" />
                          Add Option
                        </motion.button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Add Question Button */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center pt-4"
              >
                <motion.button
                  onClick={addQuestion}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-dashed border-primary/30 text-primary hover:border-primary hover:bg-primary/5 transition-all"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="h-5 w-5" />
                  Add New Question
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Quiz Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Quiz Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter quiz title..."
                        value={settings.title}
                        onChange={(e) =>
                          setSettings({ ...settings, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                      <Select
                        value={settings.timeLimit.toString()}
                        onValueChange={(value) =>
                          setSettings({ ...settings, timeLimit: parseInt(value) })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter quiz description..."
                      value={settings.description}
                      onChange={(e) =>
                        setSettings({ ...settings, description: e.target.value })
                      }
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="passingScore">Passing Score (%)</Label>
                      <Input
                        id="passingScore"
                        type="number"
                        min={0}
                        max={100}
                        value={settings.passingScore}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            passingScore: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border/30">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Shuffle Questions</Label>
                        <p className="text-sm text-muted-foreground">
                          Randomize question order for each attempt
                        </p>
                      </div>
                      <Switch
                        checked={settings.shuffleQuestions}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, shuffleQuestions: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Results</Label>
                        <p className="text-sm text-muted-foreground">
                          Display correct answers after submission
                        </p>
                      </div>
                      <Switch
                        checked={settings.showResults}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, showResults: checked })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <QuizPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        questions={questions}
        settings={settings}
      />
    </TeacherLayout>
  );
};

export default TeacherQuizCreate;
