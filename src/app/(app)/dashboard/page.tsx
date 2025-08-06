'use client';

import { jobMatchInitialSuggestions, JobMatchInitialSuggestionsOutput } from "@/ai/flows/job-match-initial-suggestions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Rocket, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  skillsAndInterests: z.string().min(10, "Please tell us a bit more about your skills and interests."),
});

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<JobMatchInitialSuggestionsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skillsAndInterests: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setSuggestions(null);
    try {
      const result = await jobMatchInitialSuggestions(values);
      setSuggestions(result);
    } catch (error) {
      console.error("Error fetching job suggestions:", error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to fetch job suggestions. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">Smart Job Matching</h1>
        <p className="text-muted-foreground mb-8">
          Describe your skills and interests, and our AI will find the perfect freelance gigs for you.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Sparkles className="h-6 w-6 text-primary" />
              <span>What are you good at?</span>
            </CardTitle>
            <CardDescription>
              For example: "I'm a frontend developer skilled in React and TypeScript. I'm passionate about building beautiful user interfaces and interested in fintech."
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="skillsAndInterests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Skills & Interests</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your skills, passions, and what you're looking for..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analyzing...</> : <>Find My Gig <Rocket className="ml-2 h-4 w-4" /></>}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {loading && (
          <div className="mt-8 text-center flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Searching for your perfect match...</span>
          </div>
        )}

        {suggestions && (
          <div className="mt-8">
            <h2 className="text-2xl font-headline font-bold mb-4">Your Job Suggestions</h2>
            <div className="grid grid-cols-1 gap-4">
              {suggestions.jobSuggestions.map((job, index) => (
                <Card key={index} className="bg-background hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <p className="font-semibold">{job}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
