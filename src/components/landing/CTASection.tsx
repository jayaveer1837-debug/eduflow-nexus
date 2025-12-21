import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-narrow text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full mb-6">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Ready to Transform Learning?</span>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Start Your Journey Today
        </h2>

        <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
          Join thousands of students and teachers already using EduNexus 
          for a smarter, more personalized learning experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="xl" 
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            asChild
          >
            <Link to="/login?role=student">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button 
            size="xl" 
            variant="outline"
            className="border-2 border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
            asChild
          >
            <Link to="/login?role=teacher">
              Become an Instructor
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
