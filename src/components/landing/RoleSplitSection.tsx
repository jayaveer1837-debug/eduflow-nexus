import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookMarked, ArrowRight, CheckCircle2 } from "lucide-react";

const studentBenefits = [
  "Personalized learning paths",
  "Interactive video lessons",
  "Smart progress tracking",
  "Discussion forums"
];

const teacherCapabilities = [
  "Course creation tools",
  "Student analytics",
  "Content management",
  "Quiz builder"
];

export const RoleSplitSection = () => {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Path
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're here to learn or teach, we've got you covered
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Student Card */}
          <Card variant="feature" className="p-8 group">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">For Students</h3>
                  <p className="text-muted-foreground">Start your learning journey</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {studentBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button variant="hero" className="w-full" asChild>
                <Link to="/login?role=student">
                  Continue as Student
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Teacher Card */}
          <Card variant="feature" className="p-8 group">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <BookMarked className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">For Teachers</h3>
                  <p className="text-muted-foreground">Empower your students</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {teacherCapabilities.map((capability, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-foreground">{capability}</span>
                  </li>
                ))}
              </ul>

              <Button variant="accent" className="w-full" asChild>
                <Link to="/login?role=teacher">
                  Continue as Teacher
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
