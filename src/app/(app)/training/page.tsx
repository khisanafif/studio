
'use client';

import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, FileText, Clock, CheckCircle, GraduationCap, BookOpen } from "lucide-react";

const suggestedTrainings = [
  { title: "TypeScript Tingkat Lanjut", provider: "Udemy", type: "Kursus Online", status: "suggested" },
  { title: "Sertifikat Profesional Desain UX Google", provider: "Coursera", type: "Sertifikasi", status: "suggested" },
  { title: "Manajemen Proyek Agile", provider: "edX", type: "Kursus Online", status: "suggested" },
];

const appliedTrainings = [
  { title: "React - Panduan Lengkap", provider: "Udemy", type: "Kursus Online", status: "applied" },
];

const inProgressTrainings = [
    { title: "Praktisi Cloud Bersertifikat AWS", provider: "AWS Training", type: "Sertifikasi", status: "in-progress" },
];

const completedTrainings = [
  { title: "Figma untuk UI/UX", provider: "DesignCourse", type: "Kursus Online", status: "completed" },
];

const allTrainings = [
  { title: "TypeScript Tingkat Lanjut", provider: "Udemy", type: "Kursus Online", status: "suggested" },
  { title: "Sertifikat Profesional Desain UX Google", provider: "Coursera", type: "Sertifikasi", status: "suggested" },
  { title: "React - Panduan Lengkap", provider: "Udemy", type: "Kursus Online", status: "applied" },
  { title: "Praktisi Cloud Bersertifikat AWS", provider: "AWS Training", type: "Sertifikasi", status: "in-progress" },
  { title: "Figma untuk UI/UX", provider: "DesignCourse", type: "Kursus Online", status: "completed" },
  { title: "Dasar-dasar Pemasaran Digital", provider: "Google", type: "Sertifikasi", status: "suggested" },
];

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState("suggested");

  const renderTrainingList = (trainings: (typeof allTrainings)) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trainings.length > 0 ? trainings.map((training, index) => (
        <Card key={index} className="flex flex-col hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="font-headline text-lg flex items-center gap-2">
                {training.type === "Sertifikasi" ? <GraduationCap className="h-5 w-5 text-primary" /> : <BookOpen className="h-5 w-5 text-primary" />}
                {training.title}
            </CardTitle>
            <CardDescription>{training.provider}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <Badge variant="outline">{training.type}</Badge>
          </CardContent>
          <CardFooter>
            {training.status === 'suggested' && <Button className="w-full">Daftar Sekarang</Button>}
            {training.status === 'applied' && <Button variant="outline" className="w-full" disabled>Pendaftaran Terkirim</Button>}
            {training.status === 'in-progress' && <Button variant="secondary" className="w-full">Sedang Berlangsung</Button>}
            {training.status === 'completed' && <Button variant="ghost" className="w-full text-green-600">Selesai</Button>}
          </CardFooter>
        </Card>
      )) : (
        <div className="md:col-span-2 lg:col-span-3 text-center py-16">
            <p className="text-lg font-semibold">Tidak ada item dalam kategori ini</p>
            <p className="text-muted-foreground">Periksa kembali nanti atau jelajahi pelatihan yang disarankan.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <section id="training-board">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">Pelatihan & Sertifikasi</h2>
          <p className="text-muted-foreground mb-8">Kelola perjalanan belajar Anda dan lacak kemajuan Anda.</p>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
              <TabsTrigger value="suggested" className="py-2"><Lightbulb className="mr-2"/>Disarankan</TabsTrigger>
              <TabsTrigger value="applied" className="py-2"><FileText className="mr-2"/>Dilamar</TabsTrigger>
              <TabsTrigger value="in-progress" className="py-2"><Clock className="mr-2"/>Sedang Berjalan</TabsTrigger>
              <TabsTrigger value="completed" className="py-2"><CheckCircle className="mr-2"/>Selesai</TabsTrigger>
            </TabsList>
            <TabsContent value="suggested" className="mt-6">
              {renderTrainingList(allTrainings.filter(t => t.status === 'suggested'))}
            </TabsContent>
            <TabsContent value="applied" className="mt-6">
              {renderTrainingList(allTrainings.filter(t => t.status === 'applied'))}
            </TabsContent>
            <TabsContent value="in-progress" className="mt-6">
              {renderTrainingList(allTrainings.filter(t => t.status === 'in-progress'))}
            </TabsContent>
            <TabsContent value="completed" className="mt-6">
              {renderTrainingList(allTrainings.filter(t => t.status === 'completed'))}
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
