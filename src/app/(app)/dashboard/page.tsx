
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
import { Loader2, Rocket, Sparkles, Lightbulb, BrainCircuit, Award, Search, BookOpen, GraduationCap, ThumbsUp, MessageSquare, Share2, Send, MoreVertical, Heart } from "lucide-react";
import { useState, useMemo } from "react";
import { useForm, useForm as useFormCareer } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Skema untuk Pencocokan Pekerjaan
const jobMatchFormSchema = z.object({
  skillsAndInterests: z.string().min(10, "Harap beri tahu kami lebih banyak tentang keahlian dan minat Anda."),
});

// Skema untuk Jalur Karir
const careerPathFormSchema = z.object({
  userSkills: z.string().min(3, "Harap sebutkan setidaknya satu keahlian."),
  userPreferences: z.string().min(3, "Harap jelaskan preferensi pekerjaan Anda."),
  userExperience: z.string().min(10, "Harap jelaskan pengalaman Anda."),
});

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};


// Data tiruan untuk bagian Pekerjaan
const mockJobs = [
  { title: "Frontend Developer untuk SaaS", company: "Innovate Inc.", pay: 12000000, type: "Kontrak", skills: ["React", "TypeScript", "Next.js"] },
  { title: "UI/UX Designer untuk Aplikasi Seluler", company: "Creative Solutions", pay: 9000000, type: "Paruh Waktu", skills: ["Figma", "UI/UX", "Desain Seluler"] },
  { title: "Backend Engineer (Node.js)", company: "DataStream", pay: 14000000, type: "Kontrak", skills: ["Node.js", "Express", "PostgreSQL"] },
  { title: "Penulis Konten untuk Blog Teknologi", company: "TechVerse", pay: 5000000, type: "Lepas", skills: ["Menulis", "SEO", "Teknologi"] },
  { title: "Manajer Media Sosial", company: "GrowthHackers", pay: 6000000, type: "Paruh Waktu", skills: ["Media Sosial", "Pemasaran", "Pembuatan Konten"] },
  { title: "Manajer Produk - Fintech", company: "FinPal", pay: 18000000, type: "Kontrak", skills: ["Manajemen Produk", "Fintech", "Agile"] },
];

// Data tiruan untuk bagian Reels
const mockReels = [
  {
    id: 1,
    user: {
      name: "alex.dev",
      avatar: "https://placehold.co/40x40.png"
    },
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    caption: "Seharian ngoding buat fitur baru! 💻 #programmerlife #coding #gigconnect",
    likes: 123,
    comments: 12,
  },
  {
    id: 2,
    user: {
      name: "creative.jane",
      avatar: "https://placehold.co/40x40.png"
    },
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    caption: "Tips & trik desain pakai Figma, dijamin produktif! ✨ #figma #desain #uiux",
    likes: 456,
    comments: 45,
  },
  {
    id: 3,
    user: {
      name: "uiux.guru",
      avatar: "https://placehold.co/40x40.png"
    },
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    caption: "Lifehacks buat para freelancer biar tetap waras. Wajib coba! #freelance #wfh #lifehacks",
    likes: 789,
    comments: 102,
  },
];

// Data tiruan untuk bagian Pelatihan
const mockTrainings = [
    { title: "Pola React Tingkat Lanjut", provider: "Udemy", type: "Kursus Daring" },
    { title: "Desainer Figma Bersertifikat", provider: "Figma Academy", type: "Sertifikasi" },
    { title: "Dasar-dasar Agile & Scrum", provider: "Coursera", type: "Kursus Daring" },
];

// Data tiruan untuk Postingan
const mockPosts = [
  {
    id: 1,
    user: { name: "Alex Doe", avatar: "https://placehold.co/40x40.png", dataAiHint: "profile picture" },
    content: "Baru saja menyelesaikan proyek freelance pertama saya di GigConnect! Pengalaman yang luar biasa bekerja dengan klien hebat. Tidak sabar untuk yang berikutnya! #freelance #gigconnect #success",
    likes: 42,
    comments: 8,
  },
  {
    id: 2,
    user: { name: "Jane Creative", avatar: "https://placehold.co/40x40.png", dataAiHint: "profile picture" },
    content: "Mencari developer React untuk proyek jangka pendek. Kirimkan portofolio Anda jika tertarik! #reactjs #developer #hiring",
    likes: 15,
    comments: 3,
  },
];


export default function DashboardPage() {
  const { toast } = useToast();

  // State dan form untuk Pencocokan Pekerjaan
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
      console.error("Kesalahan saat mengambil saran pekerjaan:", error);
      toast({ variant: "destructive", title: "Terjadi kesalahan", description: "Gagal mengambil saran pekerjaan. Silakan coba lagi." });
    } finally {
      setJobMatchLoading(false);
    }
  }

  // State dan form untuk Jalur Karir
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
    } catch (error)
 {
      console.error("Kesalahan saat mengambil jalur karir:", error);
      toast({ variant: "destructive", title: "Terjadi kesalahan", description: "Gagal membuat jalur karir. Silakan coba lagi." });
    } finally {
      setCareerPathLoading(false);
    }
  }

  // State untuk Daftar Pekerjaan
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("all");
  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const term = searchTerm.toLowerCase();
      const type = jobType.toLowerCase();
      const matchesTerm = job.title.toLowerCase().includes(term) || job.company.toLowerCase().includes(term) || job.skills.some(s => s.toLowerCase().includes(term));
      const matchesType = type === 'all' || job.type.toLowerCase().replace('-', ' ') === type.replace('-', ' ');
      return matchesTerm && matchesType;
    });
  }, [searchTerm, jobType]);


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Bagian Pencocokan Pekerjaan */}
        <section id="job-matching">
          <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">Pencocokan Pekerjaan Cerdas</h1>
          <p className="text-muted-foreground mb-8">
            Jelaskan keahlian dan minat Anda, dan AI kami akan menemukan pekerjaan lepas yang sempurna untuk Anda.
          </p>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline"><Sparkles className="h-6 w-6 text-primary" /><span>Apa keahlian Anda?</span></CardTitle>
              <CardDescription>Contoh: "Saya seorang pengembang frontend yang terampil dalam React dan TypeScript. Saya bersemangat membangun antarmuka pengguna yang indah dan tertarik pada fintech."</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...jobMatchForm}>
                <form onSubmit={jobMatchForm.handleSubmit(onJobMatchSubmit)} className="space-y-6">
                  <FormField control={jobMatchForm.control} name="skillsAndInterests" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keahlian & Minat Anda</FormLabel>
                      <FormControl><Textarea placeholder="Ceritakan tentang keahlian, minat, dan apa yang Anda cari..." rows={4} {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" disabled={jobMatchLoading} className="w-full sm:w-auto">
                    {jobMatchLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Menganalisis...</> : <>Temukan Pekerjaan Saya <Rocket className="ml-2 h-4 w-4" /></>}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          {jobMatchLoading && <div className="mt-8 text-center flex items-center justify-center gap-2 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /><span>Mencari pasangan sempurna Anda...</span></div>}
          {jobSuggestions && (
            <div className="mt-8">
              <h2 className="text-2xl font-headline font-bold mb-4">Saran Pekerjaan Anda</h2>
              <div className="grid grid-cols-1 gap-4">
                {jobSuggestions.jobSuggestions.map((job, index) => (
                  <Card key={index} className="bg-background hover:border-primary/50 transition-colors"><CardContent className="p-4"><p className="font-semibold">{job}</p></CardContent></Card>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Bagian Postingan */}
        <section id="posts">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-8">Umpan Komunitas</h2>
            <Card className="mb-8">
                <CardContent className="p-4 flex flex-col gap-4">
                    <div className="flex gap-4">
                        <Avatar>
                            <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="profile picture" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <Textarea placeholder="Apa yang Anda pikirkan, Alex?" className="flex-1" rows={2}/>
                    </div>
                    <div className="flex justify-end">
                        <Button>
                            <Send className="mr-2"/>
                            Kirim
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                {mockPosts.map(post => (
                    <Card key={post.id}>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar>
                                <AvatarImage src={post.user.avatar} data-ai-hint={post.user.dataAiHint} />
                                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{post.user.name}</p>
                                <p className="text-sm text-muted-foreground">Freelancer</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground whitespace-pre-wrap">{post.content}</p>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-4">
                           <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{post.likes} Suka</span>
                                <span>{post.comments} Komentar</span>
                           </div>
                           <Separator/>
                            <div className="flex justify-around w-full">
                                <Button variant="ghost" className="w-full">
                                    <ThumbsUp className="mr-2"/> Suka
                                </Button>
                                <Button variant="ghost" className="w-full">
                                    <MessageSquare className="mr-2"/> Komentar
                                </Button>
                                <Button variant="ghost" className="w-full">
                                    <Share2 className="mr-2"/> Bagikan
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>

        {/* Bagian Jelajahi Pekerjaan */}
        <section id="jobs">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">Jelajahi Peluang</h2>
            <p className="text-muted-foreground mb-8">Telusuri dan saring daftar pekerjaan lepas kami yang dikurasi.</p>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Cari berdasarkan judul, perusahaan, atau keahlian..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <Select value={jobType} onValueChange={setJobType}>
                    <SelectTrigger className="w-full md:w-[180px]"><SelectValue placeholder="Jenis Pekerjaan" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Jenis</SelectItem>
                        <SelectItem value="kontrak">Kontrak</SelectItem>
                        <SelectItem value="paruh-waktu">Paruh Waktu</SelectItem>
                        <SelectItem value="lepas">Lepas</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job, index) => (
                    <Card key={index} className="flex flex-col hover:border-primary/50 transition-colors">
                        <CardHeader>
                            <CardTitle className="font-headline text-lg">{job.title}</CardTitle>
                            <CardDescription>{job.company} - <span className="font-semibold text-primary">{formatRupiah(job.pay)}</span><span className='text-sm text-muted-foreground'>/proyek</span></CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1"><div className="flex flex-wrap gap-2">{job.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}</div></CardContent>
                        <CardFooter><Button asChild className="w-full"><Link href="/jobs">Lihat Detail</Link></Button></CardFooter>
                    </Card>
                ))}
            </div>
            {filteredJobs.length === 0 && <div className="text-center py-16"><p className="text-lg font-semibold">Tidak ada pekerjaan ditemukan</p><p className="text-muted-foreground">Coba sesuaikan filter pencarian Anda.</p></div>}
        </section>

        {/* Bagian Reels */}
        <section id="reels">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">Reels Freelancer</h2>
            <p className="text-muted-foreground mb-8">Dapatkan inspirasi dari video pendek dari komunitas.</p>
            <div className="flex justify-center">
                <div className="w-full max-w-sm flex flex-col items-center gap-12">
                {mockReels.map((reel) => (
                    <Card key={reel.id} className="w-full rounded-xl overflow-hidden shadow-lg relative">
                    {/* Header */}
                    <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/50 to-transparent">
                        <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={reel.user.avatar} alt={reel.user.name} data-ai-hint="profile picture" />
                            <AvatarFallback>{reel.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-bold text-sm text-white">{reel.user.name}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="text-white">
                        <MoreVertical className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Video Player */}
                    <div className="relative w-full aspect-[9/16] bg-secondary">
                        <video
                        src={reel.videoUrl}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        />
                    </div>
                    
                    {/* Actions & Caption */}
                    <div className="absolute bottom-0 left-0 w-full p-4 z-10 bg-gradient-to-t from-black/50 to-transparent">
                        <div className="flex justify-between items-end">
                            <div className="text-white max-w-[calc(100%-4rem)]">
                                <p className="text-sm">
                                    <span className="font-bold">{reel.user.name}</span> {reel.caption}
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-4">
                                <Button variant="ghost" size="icon" className="text-white h-10 w-10 flex flex-col">
                                    <Heart className="h-6 w-6" />
                                    <span className="text-xs">{reel.likes}</span>
                                </Button>
                                <Button variant="ghost" size="icon" className="text-white h-10 w-10 flex flex-col">
                                    <MessageSquare className="h-6 w-6" />
                                    <span className="text-xs">{reel.comments}</span>
                                </Button>
                                <Button variant="ghost" size="icon" className="text-white h-10 w-10">
                                    <Send className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    </Card>
                ))}
                </div>
            </div>
        </section>

        {/* Bagian Jalur Karir */}
        <section id="career-path">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">Perencanaan Karir AI</h2>
          <p className="text-muted-foreground mb-8">Biarkan AI kami menganalisis profil Anda dan menyarankan langkah selanjutnya dalam perjalanan lepas Anda.</p>
          <Card>
            <CardHeader><CardTitle className="font-headline">Ceritakan tentang diri Anda</CardTitle></CardHeader>
            <CardContent>
              <Form {...careerPathForm}>
                <form onSubmit={careerPathForm.handleSubmit(onCareerPathSubmit)} className="space-y-4">
                  <FormField control={careerPathForm.control} name="userSkills" render={({ field }) => (<FormItem><FormLabel>Keahlian Anda (dipisahkan koma)</FormLabel><FormControl><Input placeholder="React, Figma, SEO..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={careerPathForm.control} name="userPreferences" render={({ field }) => (<FormItem><FormLabel>Preferensi Pekerjaan</FormLabel><FormControl><Input placeholder="Pengembangan Frontend, Desain UI/UX..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={careerPathForm.control} name="userExperience" render={({ field }) => (<FormItem><FormLabel>Pengalaman Anda</FormLabel><FormControl><Textarea placeholder="Jelaskan latar belakang profesional Anda..." rows={4} {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <Button type="submit" disabled={careerPathLoading} className="w-full sm:w-auto">{careerPathLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Berpikir...</> : <>Sarankan Jalur Saya <Lightbulb className="ml-2 h-4 w-4" /></>}</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          {careerPathLoading && <div className="mt-8 text-center flex items-center justify-center gap-2 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin"/><span>Membangun peta jalan karir Anda...</span></div>}
          {careerSuggestion && (
            <div className="mt-8 space-y-6">
              <Card><CardHeader><CardTitle className="flex items-center gap-2 font-headline"><Lightbulb className="text-primary"/>Saran Jalur Karir</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">{careerSuggestion.suggestedCareerPath}</p></CardContent></Card>
              <Card><CardHeader><CardTitle className="flex items-center gap-2 font-headline"><BrainCircuit className="text-primary"/>Keahlian untuk Dipelajari</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{careerSuggestion.relevantSkills.split(',').map(s => s.trim()).filter(Boolean).map((skill, index) => <Badge key={index}>{skill}</Badge>)}</CardContent></Card>
              <Card><CardHeader><CardTitle className="flex items-center gap-2 font-headline"><Award className="text-primary"/>Saran Sertifikasi</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{careerSuggestion.suggestedCertifications.split(',').map(s => s.trim()).filter(Boolean).map((cert, index) => <Badge variant="secondary" key={index}>{cert}</Badge>)}</CardContent></Card>
            </div>
          )}
        </section>

        {/* Bagian Pelatihan & Sertifikasi */}
        <section id="training">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">Pelatihan & Sertifikasi</h2>
            <p className="text-muted-foreground mb-8">Tingkatkan keahlian dan dapatkan sertifikasi untuk mendapatkan pekerjaan yang lebih baik.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTrainings.map((training, index) => (
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
                            <Button asChild className="w-full"><Link href="/training">Lihat Detail</Link></Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>

      </div>
    </div>
  );
}
