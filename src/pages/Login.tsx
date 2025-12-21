import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, BookMarked, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Role = "student" | "teacher";

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const initialRole = (searchParams.get("role") as Role) || "student";
  const [selectedRole, setSelectedRole] = useState<Role>(initialRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Welcome back!",
      description: `Logged in as ${selectedRole}`,
    });

    // Navigate to appropriate dashboard
    navigate(selectedRole === "student" ? "/student/dashboard" : "/teacher/dashboard");
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      {/* Background decorations */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <Card variant="elevated" className="animate-scale-in">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">E</span>
              </div>
            </div>
            <CardTitle className="text-2xl">Welcome to EduNexus</CardTitle>
            <CardDescription>Sign in to continue your learning journey</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole("student")}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedRole === "student"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <GraduationCap className={`w-6 h-6 mx-auto mb-2 ${
                  selectedRole === "student" ? "text-primary" : "text-muted-foreground"
                }`} />
                <p className={`text-sm font-medium ${
                  selectedRole === "student" ? "text-primary" : "text-muted-foreground"
                }`}>Student</p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole("teacher")}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedRole === "teacher"
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50"
                }`}
              >
                <BookMarked className={`w-6 h-6 mx-auto mb-2 ${
                  selectedRole === "teacher" ? "text-accent" : "text-muted-foreground"
                }`} />
                <p className={`text-sm font-medium ${
                  selectedRole === "teacher" ? "text-accent" : "text-muted-foreground"
                }`}>Teacher</p>
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant={selectedRole === "student" ? "hero" : "accent"}
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : `Sign in as ${selectedRole === "student" ? "Student" : "Teacher"}`}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button className="text-primary hover:underline font-medium">
                Sign up
              </button>
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Academic project demo • No real authentication
        </p>
      </div>
    </div>
  );
};

export default Login;
