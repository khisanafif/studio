'use client';

import { suggestCareerPath, SuggestCareerPathOutput } from "@/ai/flows/suggest-career-path";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Award, BrainCircuit, Lightbulb, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  userSkills: z.string().min(3, "Please list at least one skill."),
  userPreferences: z.string().min(3, "Please describe your job preferences."),
  userExperience: z.string().min(10, "Please describe your experience."),
});

export default function CareerPathPage() {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestCareerPathOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userSkills: "",
      userPreferences: "",
      userExperience: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setSuggestion(null);
    try {
      const result = await suggestCareerPath(values);
      setSuggestion(result);
    } catch (error) {
      console.error("Error fetching career path:", error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to generate career path. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">AI Career Pathing</h1>
        <p className="text-muted-foreground mb-8">
          Let our AI analyze your profile and suggest the next steps in your freelance journey.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Tell us about yourself</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="userSkills" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Skills (comma-separated)</FormLabel>
                    <FormControl><Input placeholder="React, Figma, SEO..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="userPreferences" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Preferences</FormLabel>
                    <FormControl><Input placeholder="Frontend Development, UI/UX Design..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="userExperience" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Experience</FormLabel>
                    <FormControl><Textarea placeholder="Describe your professional background..." rows={4} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Thinking...</> : <>Suggest My Path <Lightbulb className="ml-2 h-4 w-4" /></>}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {loading && <div className="mt-8 text-center flex items-center justify-center gap-2 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin"/><span>Building your career roadmap...</span></div>}

        {suggestion && (
          <div className="mt-8 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><Lightbulb className="text-primary"/>Suggested Career Path</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{suggestion.suggestedCareerPath}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><BrainCircuit className="text-primary"/>Skills to Learn</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {suggestion.relevantSkills.split(',').map(s => s.trim()).filter(Boolean).map((skill, index) => <Badge key={index}>{skill}</Badge>)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><Award className="text-primary"/>Suggested Certifications</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                 {suggestion.suggestedCertifications.split(',').map(s => s.trim()).filter(Boolean).map((cert, index) => <Badge variant="secondary" key={index}>{cert}</Badge>)}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
