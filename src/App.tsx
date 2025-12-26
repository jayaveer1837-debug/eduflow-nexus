import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";

// Pages
import Index from "./pages/Index";
import StudentLogin from "./pages/StudentLogin";
import InstructorLogin from "./pages/InstructorLogin";
import NotFound from "./pages/NotFound";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import StudentProgress from "./pages/student/StudentProgress";
import StudentQuizzes from "./pages/student/StudentQuizzes";
import StudentQuizTake from "./pages/student/StudentQuizTake";
import StudentDiscussions from "./pages/student/StudentDiscussions";
import StudentProfile from "./pages/student/StudentProfile";

// Teacher Pages
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherAnalytics from "./pages/teacher/TeacherAnalytics";
import TeacherStudents from "./pages/teacher/TeacherStudents";
import TeacherQuizCreate from "./pages/teacher/TeacherQuizCreate";
import TeacherQuizzes from "./pages/teacher/TeacherQuizzes";
import TeacherCourses from "./pages/teacher/TeacherCourses";
import TeacherCourseDetail from "./pages/teacher/TeacherCourseDetail";
import TeacherContentCreate from "./pages/teacher/TeacherContentCreate";
import TeacherProfile from "./pages/teacher/TeacherProfile";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminInstructors from "./pages/admin/AdminInstructors";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="edunexus-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/instructor/login" element={<InstructorLogin />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/courses" element={<StudentCourses />} />
          <Route path="/student/progress" element={<StudentProgress />} />
          <Route path="/student/quizzes" element={<StudentQuizzes />} />
          <Route path="/student/quiz/:id" element={<StudentQuizTake />} />
          <Route path="/student/discussions" element={<StudentDiscussions />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          
          {/* Instructor Routes */}
          <Route path="/instructor/dashboard" element={<TeacherDashboard />} />
          <Route path="/instructor/courses" element={<TeacherCourses />} />
          <Route path="/instructor/course/:id" element={<TeacherCourseDetail />} />
          <Route path="/instructor/course/:id/content/new" element={<TeacherContentCreate />} />
          <Route path="/instructor/upload" element={<TeacherContentCreate />} />
          <Route path="/instructor/quizzes" element={<TeacherQuizzes />} />
          <Route path="/instructor/quiz/create" element={<TeacherQuizCreate />} />
          <Route path="/instructor/students" element={<TeacherStudents />} />
          <Route path="/instructor/analytics" element={<TeacherAnalytics />} />
          <Route path="/instructor/profile" element={<TeacherProfile />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/instructors" element={<AdminInstructors />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
