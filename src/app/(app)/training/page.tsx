
'use client';

import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, FileText, Clock, CheckCircle, GraduationCap, BookOpen } from "lucide-react";

const suggestedTrainings = [
  { title: "Advanced TypeScript", provider: "Udemy", type: "Online Course", status: "suggested" },
  { title: "Google UX Design Professional Certificate", provider: "Coursera", type: "Certification", status: "suggested" },
];

const appliedTrainings = [
  { title: "React - The Complete Guide", provider: "Udemy", type: "Online Course", status: "applied" },
];

const inProgressTrainings = [
    { title: "AWS Certified Cloud Practitioner", provider: "AWS Training", type: "Certification", status: "in-progress" },
];

const completedTrainings = [
  { title: "Figma for UI/UX", provider: "DesignCourse", type: "Online Course", status: "completed" },
];

const allTrainings = [...suggestedTrainings, ...appliedTrainings, ...inProgressTrainings, ...completedTrainings];

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState("suggested");

  const renderTrainingList = (trainings: typeof allTrainings) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trainings.length > 0 ? trainings.map((training, index) => (
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
            {training.status === 'suggested' && <Button className="w-full">Apply Now</Button>}
            {training.status === 'applied' && <Button variant="outline" className="w-full" disabled>Application Sent</Button>}
            {training.status === 'in-progress' && <Button variant="secondary" className="w-full">In Progress</Button>}
            {training.status === 'completed' && <Button variant="ghost" className="w-full text-green-600">Completed</Button>}
          </CardFooter>
        </Card>
      )) : (
        <div className="md:col-span-2 lg:col-span-3 text-center py-16">
            <p className="text-lg font-semibold">No items in this category</p>
            <p className="text-muted-foreground">Check back later or explore suggested trainings.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <section id="training-board">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">Training & Certifications</h2>
          <p className="text-muted-foreground mb-8">Manage your learning journey and track your progress.</p>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
              <TabsTrigger value="suggested" className="py-2"><Lightbulb className="mr-2"/>Saran</TabsTrigger>
              <TabsTrigger value="applied" className="py-2"><FileText className="mr-2"/>Di Apply</TabsTrigger>
              <TabsTrigger value="in-progress" className="py-2"><Clock className="mr-2"/>Sedang Berjalan</TabsTrigger>
              <TabsTrigger value="completed" className="py-2"><CheckCircle className="mr-2"/>Selesai</TabsTrigger>
            </TabsList>
            <TabsContent value="suggested" className="mt-6">
              {renderTrainingList(suggestedTrainings)}
            </TabsContent>
            <TabsContent value="applied" className="mt-6">
              {renderTrainingList(appliedTrainings)}
            </TabsContent>
            <TabsContent value="in-progress" className="mt-6">
              {renderTrainingList(inProgressTrainings)}
            </TabsContent>
            <TabsContent value="completed" className="mt-6">
              {renderTrainingList(completedTrainings)}
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
