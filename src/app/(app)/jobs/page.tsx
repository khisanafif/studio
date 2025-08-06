
'use client';

import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, CheckCircle, Clock, DollarSign, Briefcase } from "lucide-react";
import { Separator } from '@/components/ui/separator';

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const availableJobs = [
  { title: "Senior Frontend Developer", company: "TechCorp Indonesia", pay: 15000000, skills: ["React", "TypeScript", "GraphQL"], status: "available" },
  { title: "UI/UX Designer untuk Aplikasi Fintech", company: "CreativeWorks", pay: 12000000, skills: ["Figma", "Riset UI/UX", "Prototyping"], status: "available" },
  { title: "Full-Stack Engineer (MERN)", company: "StartupMaju", pay: 18000000, skills: ["MongoDB", "Express", "React", "Node.js"], status: "available" },
];

const appliedJobs = [
  { title: "Backend Developer (Go)", company: "DataNusa", pay: 16000000, skills: ["Go", "Microservices", "PostgreSQL"], status: "applied" },
];

const acceptedJobs = [
    { title: "Mobile App Developer (Flutter)", company: "AppWorks", pay: 14000000, skills: ["Flutter", "Dart", "Firebase"], status: "accepted" },
];

const completedJobs = [
  { title: "Spesialis SEO", company: "Digital Agency", pay: 8000000, skills: ["SEO", "Pemasaran Konten", "Google Analytics"], status: "completed" },
  { title: "Penulis Teknis", company: "Docs Inc.", pay: 9500000, skills: ["Penulisan Teknis", "Dokumentasi API"], status: "completed" },
];

const allJobs = [...availableJobs, ...appliedJobs, ...acceptedJobs, ...completedJobs];

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState("available");

  const totalEarnings = completedJobs.reduce((acc, job) => acc + job.pay, 0);

  const renderJobList = (jobs: typeof allJobs) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.length > 0 ? jobs.map((job, index) => (
        <Card key={index} className="flex flex-col hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="font-headline text-lg">{job.title}</CardTitle>
            <CardDescription>{job.company}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
            </div>
            <p className="font-semibold text-primary">{formatRupiah(job.pay)}<span className='text-sm text-muted-foreground'>/proyek</span></p>
          </CardContent>
          <CardFooter>
            {job.status === 'available' && <Button className="w-full">Lamar Sekarang</Button>}
            {job.status === 'applied' && <Button variant="outline" className="w-full" disabled>Lamaran Terkirim</Button>}
            {job.status === 'accepted' && <Button variant="secondary" className="w-full">Sedang Berjalan</Button>}
            {job.status === 'completed' && <Button variant="ghost" className="w-full text-green-600">Selesai</Button>}
          </CardFooter>
        </Card>
      )) : (
        <div className="md:col-span-2 lg:col-span-3 text-center py-16">
            <p className="text-lg font-semibold">Tidak ada pekerjaan dalam kategori ini</p>
            <p className="text-muted-foreground">Periksa lagi nanti atau jelajahi pekerjaan yang tersedia.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <section id="earnings">
            <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-headline">
                        <DollarSign className="h-6 w-6" />
                        <span>Total Pendapatan</span>
                    </CardTitle>
                    <CardDescription className='text-primary-foreground/80'>Ini adalah jumlah total yang telah Anda peroleh dari pekerjaan yang selesai.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">{formatRupiah(totalEarnings)}</p>
                </CardContent>
            </Card>
        </section>
        
        <Separator />

        <section id="job-board">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">Papan Pekerjaan</h2>
          <p className="text-muted-foreground mb-8">Kelola lamaran pekerjaan lepas Anda dan lacak kemajuan Anda.</p>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
              <TabsTrigger value="available" className="py-2"><Briefcase className="mr-2"/>Tersedia</TabsTrigger>
              <TabsTrigger value="applied" className="py-2"><FileText className="mr-2"/>Dilamar</TabsTrigger>
              <TabsTrigger value="accepted" className="py-2"><Clock className="mr-2"/>Diterima</TabsTrigger>
              <TabsTrigger value="completed" className="py-2"><CheckCircle className="mr-2"/>Selesai</TabsTrigger>
            </TabsList>
            <TabsContent value="available" className="mt-6">
              {renderJobList(availableJobs)}
            </TabsContent>
            <TabsContent value="applied" className="mt-6">
              {renderJobList(appliedJobs)}
            </TabsContent>
            <TabsContent value="accepted" className="mt-6">
              {renderJobList(acceptedJobs)}
            </TabsContent>
            <TabsContent value="completed" className="mt-6">
              {renderJobList(completedJobs)}
            </TabsContent>
          </Tabs>
        </section>

      </div>
    </div>
  );
}
