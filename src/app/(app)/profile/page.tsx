import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const skills = ["React", "Next.js", "TypeScript", "Node.js", "GraphQL", "UI/UX Design", "Figma", "Product Strategy"];
const portfolio = [
  { title: "E-commerce Platform", description: "A full-stack e-commerce site with a custom CMS.", image: "https://placehold.co/600x400.png", dataAiHint: "website ecommerce" },
  { title: "SaaS Dashboard", description: "Analytics dashboard for a B2B software company.", image: "https://placehold.co/600x400.png", dataAiHint: "dashboard analytics" },
  { title: "Mobile Banking App", description: "UI/UX design for a next-gen mobile banking application.", image: "https://placehold.co/600x400.png", dataAiHint: "mobile app" },
];
const experience = [
  { role: "Senior Frontend Developer", company: "Tech Solutions Inc.", period: "2021 - Present" },
  { role: "UI/UX Designer", company: "Creative Minds", period: "2019 - 2021" },
];

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary">
                <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="profile picture" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-headline font-bold">Alex Doe</h2>
              <p className="text-muted-foreground">Frontend Developer & UI/UX Enthusiast</p>
              <div className="flex justify-center gap-4 mt-4">
                <Button variant="ghost" size="icon" asChild><a href="#"><Mail className="h-5 w-5" /></a></Button>
                <Button variant="ghost" size="icon" asChild><a href="#"><Github className="h-5 w-5" /></a></Button>
                <Button variant="ghost" size="icon" asChild><a href="#"><Linkedin className="h-5 w-5" /></a></Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {skills.map(skill => <Badge key={skill}>{skill}</Badge>)}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Passionate developer with 5+ years of experience in building scalable and user-friendly web applications. I thrive on solving complex problems and creating beautiful, intuitive interfaces. Looking for my next challenge in the freelance world.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Work Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {experience.map(exp => (
                <div key={exp.role}>
                  <h3 className="font-semibold">{exp.role}</h3>
                  <p className="text-sm text-muted-foreground">{exp.company} | {exp.period}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-headline font-bold mb-4">Digital Portfolio</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {portfolio.map(item => (
                <Card key={item.title} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    width={600} 
                    height={400} 
                    className="w-full h-auto object-cover" 
                    data-ai-hint={item.dataAiHint}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
