import { UserCircle, Laptop, TrendingUp, Target, BookOpen } from "lucide-react";

const steps = [
  {
    icon: UserCircle,
    title: "Create Account",
    description: "Sign up as a student or teacher"
  },
  {
    icon: Laptop,
    title: "Choose Your Role",
    description: "Access role-specific dashboard"
  },
  {
    icon: BookOpen,
    title: "Learn or Teach",
    description: "Engage with personalized content"
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Monitor achievements in real-time"
  },
  {
    icon: Target,
    title: "Improve Continuously",
    description: "Get AI-powered recommendations"
  }
];

export const HowItWorks = () => {
  return (
    <section className="section-padding bg-gradient-hero">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in just a few simple steps
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index} 
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center z-10">
                    {index + 1}
                  </div>

                  <div className="w-full bg-card rounded-2xl p-6 pt-10 shadow-soft relative">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
