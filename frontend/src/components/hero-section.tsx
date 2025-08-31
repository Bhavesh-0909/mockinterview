import { Ripple } from "@/components/magicui/ripple";
import { Button } from "@/components/ui/button";
import { ArrowRight} from "lucide-react";

function HeroSection() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] max-w-screen px-6">
      <h1 className="scroll-m-20 text-center text-4xl md:text-6xl font-extrabold tracking-tight text-balance">AI Powered<br /> Mock <span className="text-primary">Interviews</span></h1>
      <p className="text-center text-lg text-muted-foreground leading-7 [&:not(:first-child)]:mt-6">Get ready for your interview with our AI powered mock interview platform. <br />Take the preparation to the next level with personalized feedback and realtime practice.</p>
      <div className="mt-6 flex gap-4">
        <Button variant="default" className="flex gap-1 items-center">Get Started <ArrowRight className="size-5" /></Button>
        <Button variant="outline">Learn More</Button>
      </div>
      <Ripple mainCircleSize={100} mainCircleOpacity={0.24} numCircles={6} />
    </div>
  )
}

export default HeroSection