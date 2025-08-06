import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, Compass, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <Button asChild>
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <h1 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
            Find Your Next Gig, Fast.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            GigConnect is the smartest way for Gen Z to discover freelance opportunities. Ditch the endless scrolling. We bring the right gigs to you.
          </p>
          <Button size="lg" asChild>
            <Link href="/dashboard">
              Explore Opportunities <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </section>

        <section id="features" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 bg-secondary/30 rounded-t-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">How It Works</h2>
            <p className="max-w-xl mx-auto text-muted-foreground mt-2">A simple, AI-powered path to your next freelance job.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline">1. Create Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Build a simple portfolio highlighting your skills, experience, and what you're looking for.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline">2. Get AI-Powered Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Our AI analyzes your profile to suggest the most relevant freelance jobs and career moves.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                  <Compass className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline">3. Chart Your Course</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Use our career pathing tool to identify skills and certifications to level up your career.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Your Digital Portfolio, Reimagined.</h2>
              <p className="text-muted-foreground mt-4 mb-6">Showcase your best work with a clean, professional digital portfolio. Let your projects speak for themselves and attract top clients.</p>
              <Button variant="outline" asChild>
                <Link href="/profile">Build Your Portfolio</Link>
              </Button>
            </div>
            <div className="w-full h-full">
              <Image
                src="https://placehold.co/600x400.png"
                width={600}
                height={400}
                alt="Digital Portfolio Showcase"
                className="rounded-lg shadow-xl"
                data-ai-hint="portfolio developer"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Logo />
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">&copy; {new Date().getFullYear()} GigConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
