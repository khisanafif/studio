
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { ArrowRight, Bot, Compass, User, BookOpen, GraduationCap, Video, Lightbulb } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const featuredJobs = [
  { title: "Frontend Developer untuk SaaS", company: "Innovate Inc.", pay: 12000000, type: "Kontrak", skills: ["React", "TypeScript", "Next.js"] },
  { title: "UI/UX Designer untuk Aplikasi Seluler", company: "Creative Solutions", pay: 9000000, type: "Paruh Waktu", skills: ["Figma", "UI/UX", "Desain Seluler"] },
  { title: "Backend Engineer (Node.js)", company: "DataStream", pay: 14000000, type: "Kontrak", skills: ["Node.js", "Express", "PostgreSQL"] },
  { title: "Penulis Konten untuk Blog Teknologi", company: "TechVerse", pay: 5000000, type: "Lepas", skills: ["Menulis", "SEO", "Teknologi"] },
  { title: "Manajer Media Sosial", company: "GrowthHackers", pay: 6000000, type: "Paruh Waktu", skills: ["Media Sosial", "Pemasaran", "Pembuatan Konten"] },
  { title: "Manajer Produk - Fintech", company: "FinPal", pay: 18000000, type: "Kontrak", skills: ["Manajemen Produk", "Fintech", "Agile"] },
];

const featuredTrainings = [
    { title: "Pola React Tingkat Lanjut", provider: "Udemy", type: "Kursus Online", icon: BookOpen },
    { title: "Desainer Figma Bersertifikat", provider: "Figma Academy", type: "Sertifikasi", icon: GraduationCap },
    { title: "Dasar-dasar Agile & Scrum", provider: "Coursera", type: "Kursus Online", icon: BookOpen },
    { title: "Dasar-dasar Pemasaran Digital", provider: "Google Digital Garage", type: "Kursus Online", icon: BookOpen },
    { title: "Sertifikasi Profesional Ilmu Data IBM", provider: "Coursera", type: "Sertifikasi", icon: GraduationCap },
    { title: "Manajemen Proyek untuk Pemula", provider: "Project Management Institute", type: "Kursus Online", icon: BookOpen },
];

const featuredReels = [
    { id: 1, title: "Sehari dalam Kehidupan seorang Freelancer", user: "alex.dev", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
    { id: 2, title: "Bagaimana Saya Mendapatkan Klien Pertama Saya", user: "creative.jane", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
    { id: 3, title: "3 Trik Figma Teratas", user: "uiux.guru", videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
];


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Masuk</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Daftar</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <h1 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
            Smart Freelance Hub for Gen-Z
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            Dapatkan job freelance yang cocok tanpa drama
            📁 Build. ✨ Show. 💼 Get Hired.
          </p>
          <Button size="lg" asChild>
            <Link href="/login">
              Jelajahi Peluang <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </section>

        <section id="features" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 bg-secondary/30 rounded-t-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">How It Works</h2>
            <p className="max-w-xl mx-auto text-muted-foreground mt-2">
              Cuma 3 langkah simpel buat mulai karier freelance kamu bareng AI!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline">1. Bangun Profil Kerenmu</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ceritain siapa kamu, keahlian apa yang kamu punya, dan project seperti apa yang kamu incar. Biar klien langsung klik!
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline">2. Dapat Rekomendasi Pintar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Teknologi AI kami bantu kamu nemuin gig freelance yang paling cocok — tanpa harus scroll seharian!
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                  <Compass className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline">3. Rancang Langkah Selanjutnya</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Butuh skill tambahan? Tenang! Gunakan career planner kami buat tahu apa yang harus ditingkatkan. Stay growing!
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="featured-jobs" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Pekerjaan Lepas Unggulan</h2>
            <p className="max-w-xl mx-auto text-muted-foreground mt-2">Peluang pilihan untuk memulai karir lepas Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <Card key={index} className="flex flex-col hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="font-headline text-lg">{job.title}</CardTitle>
                  <CardDescription>{job.company} - <span className="font-semibold text-primary">{formatRupiah(job.pay)}</span><span className='text-sm text-muted-foreground'>/proyek</span></CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full"><Link href="/login">Lihat Detail</Link></Button>
                </CardFooter>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link href="/login">Lihat Semua Pekerjaan <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>

        <section id="training" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 bg-secondary/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Tingkatkan Keahlian Anda</h2>
            <p className="max-w-xl mx-auto text-muted-foreground mt-2">Investasikan pada diri Anda dengan kursus dan sertifikasi yang relevan dengan industri.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTrainings.map((training, index) => (
              <Card key={index} className="flex flex-col hover:border-primary/50 transition-colors">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <training.icon className="h-8 w-8 text-primary" />
                        <CardTitle className="font-headline text-lg">{training.title}</CardTitle>
                    </div>
                  <CardDescription>{training.provider}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <Badge variant="outline">{training.type}</Badge>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full"><Link href="/login">Pelajari Lebih Lanjut</Link></Button>
                </CardFooter>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link href="/login">Jelajahi Semua Pelatihan <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>

        <section id="m-reels" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Dapatkan Inspirasi dari M-Reels</h2>
            <p className="max-w-xl mx-auto text-muted-foreground mt-2">Tonton video pendek dari komunitas freelancer untuk tips, trik, dan motivasi.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuredReels.map((reel) => (
                  <Card key={reel.id} className="group overflow-hidden relative rounded-lg">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                          <Video className="h-12 w-12 text-white" />
                      </div>
                      <div className="p-4 absolute bottom-0 left-0 text-white">
                          <h3 className="font-bold">{reel.title}</h3>
                          <p className="text-sm opacity-90">@{reel.user}</p>
                      </div>
                      <div className="w-full h-80 bg-muted flex items-center justify-center">
                           <video
                              src={reel.videoUrl}
                              className="w-full h-full object-cover"
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                      </div>
                  </Card>
              ))}
          </div>
           <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link href="/login">Tonton Lebih Banyak <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>
        
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Portofolio Digital Anda, Diciptakan Ulang.</h2>
              <p className="text-muted-foreground mt-4 mb-6">Pamerkan karya terbaik Anda dengan portofolio digital yang bersih dan profesional. Biarkan proyek Anda berbicara dan menarik klien papan atas.</p>
              <Button variant="outline" asChild>
                <Link href="/login">Bangun Portofolio Anda</Link>
              </Button>
            </div>
            <div className="w-full h-full">
              <Image
                src="https://placehold.co/600x400.png"
                width={600}
                height={400}
                alt="Pameran Portofolio Digital"
                className="rounded-lg shadow-xl"
                data-ai-hint="portfolio developer"
              />
            </div>
          </div>
        </section>

        <section id="career-planning" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 bg-secondary/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Rencanakan Karir Anda dengan AI</h2>
            <p className="max-w-xl mx-auto text-muted-foreground mt-2">Biar AI kami menganalisis profil Anda dan menyarankan langkah selanjutnya dalam perjalanan lepas Anda.</p>
          </div>
           <Card className="max-w-2xl mx-auto">
            <CardHeader><CardTitle className="font-headline">Ceritakan tentang diri Anda</CardTitle></CardHeader>
            <CardContent>
              <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="skills-landing">Keahlian Anda (dipisahkan koma)</Label>
                    <Input id="skills-landing" placeholder="React, Figma, SEO..." readOnly/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferences-landing">Preferensi Pekerjaan</Label>
                    <Input id="preferences-landing" placeholder="Pengembangan Frontend, Desain UI/UX..." readOnly/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience-landing">Pengalaman Anda</Label>
                    <Textarea id="experience-landing" placeholder="Jelaskan latar belakang profesional Anda..." rows={4} readOnly />
                  </div>
                  <Button asChild className="w-full sm:w-auto">
                    <Link href="/login">Sarankan Jalur Saya <Lightbulb className="ml-2 h-4 w-4" /></Link>
                  </Button>
              </form>
            </CardContent>
          </Card>
        </section>

      </main>

      <Footer />
    </div>
  );
}
