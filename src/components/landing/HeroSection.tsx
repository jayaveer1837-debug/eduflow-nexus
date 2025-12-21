import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-illustration.png";

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container-wide px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 animate-fade-up">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Learning</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up delay-100">
              The Future of{" "}
              <span className="gradient-text">Intelligent Learning</span>{" "}
              Starts Here
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed animate-fade-up delay-200">
              Experience personalized education with AI-driven insights, interactive courses, 
              and seamless collaboration between teachers and students.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
              <Button variant="hero" size="xl" asChild>
                <Link to="/login?role=student">
                  Start Learning
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/login?role=teacher">
                  Start Teaching
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 mt-12 animate-fade-up delay-400">
              <div>
                <p className="text-3xl font-bold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground">Active Students</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="text-3xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Expert Teachers</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <p className="text-3xl font-bold text-foreground">1,200+</p>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-up delay-200">
            <div className="relative">
              <img
                src={heroImage}
                alt="EduNexus AI-powered learning platform illustration"
                className="w-full rounded-3xl shadow-elevated"
              />
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-elevated animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Smart Progress</p>
                    <p className="text-xs text-muted-foreground">AI-tracked learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
