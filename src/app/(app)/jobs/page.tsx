'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";

const mockJobs = [
  { title: "Frontend Developer for SaaS", company: "Innovate Inc.", pay: "75/hr", type: "Contract", skills: ["React", "TypeScript", "Next.js"] },
  { title: "UI/UX Designer for Mobile App", company: "Creative Solutions", pay: "60/hr", type: "Part-Time", skills: ["Figma", "UI/UX", "Mobile Design"] },
  { title: "Backend Engineer (Node.js)", company: "DataStream", pay: "85/hr", type: "Contract", skills: ["Node.js", "Express", "PostgreSQL"] },
  { title: "Content Writer for Tech Blog", company: "TechVerse", pay: "50/hr", type: "Freelance", skills: ["Writing", "SEO", "Tech"] },
  { title: "Social Media Manager", company: "GrowthHackers", pay: "45/hr", type: "Part-Time", skills: ["Social Media", "Marketing", "Content Creation"] },
  { title: "Product Manager - Fintech", company: "FinPal", pay: "110/hr", type: "Contract", skills: ["Product Management", "Fintech", "Agile"] },
];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("all");

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const term = searchTerm.toLowerCase();
      const type = jobType.toLowerCase();

      const matchesTerm = job.title.toLowerCase().includes(term) ||
                          job.company.toLowerCase().includes(term) ||
                          job.skills.some(s => s.toLowerCase().includes(term));
      
      const matchesType = type === 'all' || job.type.toLowerCase() === type;

      return matchesTerm && matchesType;
    });
  }, [searchTerm, jobType]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">Explore Opportunities</h1>
      <p className="text-muted-foreground mb-8">
        Browse and filter through our curated list of freelance jobs.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search by title, company, or skill..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={jobType} onValueChange={setJobType}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
            <SelectItem value="Part-Time">Part-Time</SelectItem>
            <SelectItem value="Freelance">Freelance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.map((job, index) => (
          <Card key={index} className="flex flex-col hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="font-headline">{job.title}</CardTitle>
              <CardDescription>{job.company} - <span className="font-semibold text-primary">${job.pay}</span></CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2">
                {job.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-16">
            <p className="text-lg font-semibold">No jobs found</p>
            <p className="text-muted-foreground">Try adjusting your search filters.</p>
        </div>
      )}
    </div>
  );
}
