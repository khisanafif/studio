
'use client';

import { suggestCareerPath, SuggestCareerPathOutput } from "@/ai/flows/suggest-career-path";
import { jobMatchInitialSuggestions, JobMatchInitialSuggestionsOutput } from "@/ai/flows/job-match-initial-suggestions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Rocket, Sparkles, Lightbulb, BrainCircuit, Award, Search, Video, BookOpen, GraduationCap } from "lucide-react";
import { useState, useMemo } from "react";
import { useForm, useForm as useFormCareer } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

// Schema for Job Match
const jobMatchFormSchema = z.object({
  skillsAndInterests: z.string().min(10, "Please tell us a bit more about your skills and interests."),
});

// Schema for Career Path
const careerPathFormSchema = z.object({
  userSkills: z.string().min(3, "Please list at least one skill."),
  userPreferences: z.string().min(3, "Please describe your job preferences."),
  userExperience: z.string().min(10, "Please describe your experience."),
});

// Mock data for Jobs section
const mockJobs = [
  { title: "Frontend Developer for SaaS", company: "Innovate Inc.", pay: "75/hr", type: "Contract", skills: ["React", "TypeScript", "Next.js"] },
  { title: "UI/UX Designer for Mobile App", company: "Creative Solutions", pay: "60/hr", type: "Part-Time", skills: ["Figma", "UI/UX", "Mobile Design"] },
  { title: "Backend Engineer (Node.js)", company: "DataStream", pay: "85/hr", type: "Contract", skills: ["Node.js", "Express", "PostgreSQL"] },
  { title: "Content Writer for Tech Blog", company: "TechVerse", pay: "50/hr", type: "Freelance", skills: ["Writing", "SEO", "Tech"] },
  { title: "Social Media Manager", company: "GrowthHackers", pay: "45/hr", type: "Part-Time", skills: ["Social Media", "Marketing", "Content Creation"] },
  { title: "Product Manager - Fintech", company: "FinPal", pay: "110/hr", type: "Contract", skills: ["Product Management", "Fintech", "Agile"] },
];

// Mock data for Reels section
const mockReels = [
    { id: 1, title: "Day in the Life of a Freelancer", user: "alex.dev" },
    { id: 2, title: "How I Landed My First Client", user: "creative.jane" },
    { id: 3, title: "Top 3 Figma Tricks", user: "uiux.guru" },
];

// Mock data for Training section
const mockTrainings = [
    { title: "Advanced React Patterns", provider: "Udemy", type: "Online Course" },
    { title: "Certified Figma Designer", provider: "Figma Academy", type: "Certification" },
    { title: "Agile & Scrum Fundamentals", provider: "Coursera", type: "Online Course" },
];


export default function DashboardPage() {
  const { toast } = useToast();

  // State and form for Job Match
  const [jobMatchLoading, setJobMatchLoading] = useState(false);
  const [jobSuggestions, setJobSuggestions] = useState<JobMatchInitialSuggestionsOutput | null>(null);
  const jobMatchForm = useForm<z.infer<typeof jobMatchFormSchema>>({
    resolver: zodResolver(jobMatchFormSchema),
    defaultValues: { skillsAndInterests: "" },
  });
  async function onJobMatchSubmit(values: z.infer<typeof jobMatchFormSchema>) {
    setJobMatchLoading(true);
    setJobSuggestions(null);
    try {
      const result = await jobMatchInitialSuggestions(values);
      setJobSuggestions(result);
    } catch (error) {
      console.error("Error fetching job suggestions:", error);
      toast({ variant: "destructive", title: "An error occurred", description: "Failed to fetch job suggestions. Please try again." });
    } finally {
      setJobMatchLoading(false);
    }
  }

  // State and form for Career Path
  const [careerPathLoading, setCareerPathLoading] = useState(false);
  const [careerSuggestion, setCareerSuggestion] = useState<SuggestCareerPathOutput | null>(null);
  const careerPathForm = useFormCareer<z.infer<typeof careerPathFormSchema>>({
    resolver: zodResolver(careerPathFormSchema),
    defaultValues: { userSkills: "", userPreferences: "", userExperience: "" },
  });
  async function onCareerPathSubmit(values: z.infer<typeof careerPathFormSchema>) {
    setCareerPathLoading(true);
    setCareerSuggestion(null);
    try {
      const result = await suggestCareerPath(values);
      setCareerSuggestion(result);
    } catch (error) {
      console.error("Error fetching career path:", error);
      toast({ variant: "destructive", title: "An error occurred", description: "Failed to generate career path. Please try again." });
    } finally {
      setCareerPathLoading(false);
    }
  }

  // State for Jobs List
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("all");
  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const term = searchTerm.toLowerCase();
      const type = jobType.toLowerCase();
      const matchesTerm = job.title.toLowerCase().includes(term) || job.company.toLowerCase().includes(term) || job.skills.some(s => s.toLowerCase().includes(term));
      const matchesType = type === 'all' || job.type.toLowerCase() === type;
      return matchesTerm && matchesType;
    });
  }, [searchTerm, jobType]);


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Job Matching Section */}
        <section id="job-matching">
          <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">Smart Job Matching</h1>
          <p className="text-muted-foreground mb-8">
            Describe your skills and interests, and our AI will find the perfect freelance gigs for you.
          </p>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline"><Sparkles className="h-6 w-6 text-primary" /><span>What are you good at?</span></CardTitle>
              <CardDescription>For example: "I'm a frontend developer skilled in React and TypeScript. I'm passionate about building beautiful user interfaces and interested in fintech."</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...jobMatchForm}>
                <form onSubmit={jobMatchForm.handleSubmit(onJobMatchSubmit)} className="space-y-6">
                  <FormField control={jobMatchForm.control} name="skillsAndInterests" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Skills & Interests</FormLabel>
                      <FormControl><Textarea placeholder="Tell us about your skills, passions, and what you're looking for..." rows={4} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" disabled={jobMatchLoading} className="w-full sm:w-auto">
                    {jobMatchLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analyzing...</> : <>Find My Gig <Rocket className="ml-2 h-4 w-4" /></>}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          {jobMatchLoading && <div className="mt-8 text-center flex items-center justify-center gap-2 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /><span>Searching for your perfect match...</span></div>}
          {jobSuggestions && (
            <div className="mt-8">
              <h2 className="text-2xl font-headline font-bold mb-4">Your Job Suggestions</h2>
              <div className="grid grid-cols-1 gap-4">
                {jobSuggestions.jobSuggestions.map((job, index) => (
                  <Card key={index} className="bg-background hover:border-primary/50 transition-colors"><CardContent className="p-4"><p className="font-semibold">{job}</p></CardContent></Card>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Explore Jobs Section */}
        <section id="jobs">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">Explore Opportunities</h2>
            <p className="text-muted-foreground mb-8">Browse and filter through our curated list of freelance jobs.</p>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search by title, company, or skill..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <Select value={jobType} onValueChange={setJobType}>
                    <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="Job Type" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Part-Time">Part-Time</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job, index) => (
                    <Card key={index} className="flex flex-col hover:border-primary/50 transition-colors">
                        <CardHeader>
                            <CardTitle className="font-headline text-lg">{job.title}</CardTitle>
                            <CardDescription>{job.company} - <span className="font-semibold text-primary">${job.pay}</span></CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1"><div className="flex flex-wrap gap-2">{job.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}</div></CardContent>
                        <CardFooter><Button asChild className="w-full"><Link href="/jobs">View Details</Link></Button></CardFooter>
                    </Card>
                ))}
            </div>
            {filteredJobs.length === 0 && <div className="text-center py-16"><p className="text-lg font-semibold">No jobs found</p><p className="text-muted-foreground">Try adjusting your search filters.</p></div>}
        </section>

        {/* Reels Section */}
        <section id="reels">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">Freelancer Reels</h2>
            <p className="text-muted-foreground mb-8">Get inspired by short videos from the community.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {mockReels.map((reel) => (
                    <Card key={reel.id} className="group overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Video className="h-12 w-12 text-white" />
                        </div>
                        <div className="p-4 absolute bottom-0 left-0 text-white">
                            <h3 className="font-bold">{reel.title}</h3>
                            <p className="text-sm opacity-90">@{reel.user}</p>
                        </div>
                         <div className="w-full h-80 bg-secondary flex items-center justify-center">
                            <Video className="h-16 w-16 text-muted-foreground" />
                        </div>
                    </Card>
                ))}
            </div>
        </section>

        {/* Career Path Section */}
        <section id="career-path">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">AI Career Pathing</h2>
          <p className="text-muted-foreground mb-8">Let our AI analyze your profile and suggest the next steps in your freelance journey.</p>
          <Card>
            <CardHeader><CardTitle className="font-headline">Tell us about yourself</CardTitle></CardHeader>
            <CardContent>
              <Form {...careerPathForm}>
                <form onSubmit={careerPathForm.handleSubmit(onCareerPathSubmit)} className="space-y-4">
                  <FormField control={careerPathForm.control} name="userSkills" render={({ field }) => (<FormItem><FormLabel>Your Skills (comma-separated)</FormLabel><FormControl><Input placeholder="React, Figma, SEO..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={careerPathForm.control} name="userPreferences" render={({ field }) => (<FormItem><FormLabel>Job Preferences</FormLabel><FormControl><Input placeholder="Frontend Development, UI/UX Design..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={careerPathForm.control} name="userExperience" render={({ field }) => (<FormItem><FormLabel>Your Experience</FormLabel><FormControl><Textarea placeholder="Describe your professional background..." rows={4} {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <Button type="submit" disabled={careerPathLoading} className="w-full sm:w-auto">{careerPathLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Thinking...</> : <>Suggest My Path <Lightbulb className="ml-2 h-4 w-4" /></>}</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          {careerPathLoading && <div className="mt-8 text-center flex items-center justify-center gap-2 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin"/><span>Building your career roadmap...</span></div>}
          {careerSuggestion && (
            <div className="mt-8 space-y-6">
              <Card><CardHeader><CardTitle className="flex items-center gap-2 font-headline"><Lightbulb className="text-primary"/>Suggested Career Path</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">{careerSuggestion.suggestedCareerPath}</p></CardContent></Card>
              <Card><CardHeader><CardTitle className="flex items-center gap-2 font-headline"><BrainCircuit className="text-primary"/>Skills to Learn</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{careerSuggestion.relevantSkills.split(',').map(s => s.trim()).filter(Boolean).map((skill, index) => <Badge key={index}>{skill}</Badge>)}</CardContent></Card>
              <Card><CardHeader><CardTitle className="flex items-center gap-2 font-headline"><Award className="text-primary"/>Suggested Certifications</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{careerSuggestion.suggestedCertifications.split(',').map(s => s.trim()).filter(Boolean).map((cert, index) => <Badge variant="secondary" key={index}>{cert}</Badge>)}</CardContent></Card>
            </div>
          )}
        </section>

        {/* Training & Certification Section */}
        <section id="training">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">Training & Certifications</h2>
            <p className="text-muted-foreground mb-8">Upskill and get certified to land better gigs.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTrainings.map((training, index) => (
                    <Card key={index} className="flex flex-col hover:border-primary/50 transition-colors">
                        <CardHeader>
                            <CardTitle className="font-headline text-lg flex items-center gap-2">
                                {training.type === "Certification" ? <GraduationCap className="h-5 w-5 text-primary" /> : <BookOpen className="h-5 w-5 text-primary" />}
                                {training.title}
                            </CardTitle>
                            <CardDescription>{training.provider}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <Badge variant="outline">{training.type}</Badge>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full"><Link href="/training">View Details</Link></Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>

      </div>
    </div>
  );
}
