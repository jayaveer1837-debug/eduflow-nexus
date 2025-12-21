import { CheckCircle2 } from "lucide-react";

const problems = [
  "One-size-fits-all curriculum",
  "Lack of real-time progress tracking",
  "Disconnected learning resources",
  "Limited teacher-student interaction"
];

const solutions = [
  "AI-personalized learning paths",
  "Real-time analytics and insights",
  "Unified content management",
  "Seamless collaboration tools"
];

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why EduNexus?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Traditional LMS platforms fail to adapt to individual needs. 
            We're changing that with intelligent, personalized learning.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Problem */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-full text-sm font-medium">
              The Problem
            </div>
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl"
                >
                  <div className="w-2 h-2 rounded-full bg-destructive mt-2" />
                  <p className="text-muted-foreground">{problem}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solution */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Our Solution
            </div>
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-foreground font-medium">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
