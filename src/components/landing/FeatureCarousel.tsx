import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Brain, 
  Video, 
  Target, 
  BarChart3, 
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Personalized Learning",
    description: "AI adapts content to your learning style and pace for maximum retention."
  },
  {
    icon: Video,
    title: "Embedded Video Learning",
    description: "Seamlessly integrated video lessons with progress tracking and notes."
  },
  {
    icon: Target,
    title: "Smart Quizzes",
    description: "Adaptive assessments that adjust difficulty based on your performance."
  },
  {
    icon: BarChart3,
    title: "Teacher Analytics",
    description: "Comprehensive insights into student engagement and learning outcomes."
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Visual dashboards showing your learning journey and achievements."
  },
];

export const FeatureCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  return (
    <section id="features" className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful Features for Modern Learning
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for an exceptional educational experience
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                variant="feature" 
                className="text-center p-6"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <Card variant="feature" className="text-center p-8">
              <CardContent className="p-0">
                {(() => {
                  const Icon = features[currentIndex].icon;
                  return (
                    <>
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {features[currentIndex].title}
                      </h3>
                      <p className="text-muted-foreground">
                        {features[currentIndex].description}
                      </p>
                    </>
                  );
                })()}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={goToPrev}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              
              <div className="flex gap-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? "bg-primary w-6" 
                        : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
