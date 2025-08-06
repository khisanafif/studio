
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { ArrowRight, Bot, Compass, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer";

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
            Temukan Pekerjaan Lepas Anda, dengan Cepat.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            GigConnect adalah cara terpintar bagi Gen Z untuk menemukan peluang kerja lepas. Tinggalkan gulir tak berujung. Kami membawa pekerjaan yang tepat untuk Anda.
          </p>
          <Button size="lg" asChild>
            <Link href="/dashboard">
              Jelajahi Peluang <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </section>

        <section id="features" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 bg-secondary/30 rounded-t-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Cara Kerjanya</h2>
            <p className="max-w-xl mx-auto text-muted-foreground mt-2">Jalan sederhana yang didukung AI untuk pekerjaan lepas Anda berikutnya.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline">1. Buat Profil Anda</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Bangun portofolio sederhana yang menyoroti keahlian, pengalaman, dan apa yang Anda cari.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline">2. Dapatkan Kecocokan AI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">AI kami menganalisis profil Anda untuk menyarankan pekerjaan lepas dan langkah karir yang paling relevan.</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                  <Compass className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline">3. Rencanakan Arah Anda</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Gunakan alat perencanaan karir kami untuk mengidentifikasi keterampilan dan sertifikasi untuk meningkatkan karir Anda.</p>
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
                  <CardTitle className="font-headline">{job.title}</CardTitle>
                  <CardDescription>{job.company} - <span className="font-semibold text-primary">{formatRupiah(job.pay)}</span><span className='text-sm text-muted-foreground'>/proyek</span></CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Lihat Detail</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <Link href="/jobs">Lihat Semua Pekerjaan <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Portofolio Digital Anda, Diciptakan Ulang.</h2>
              <p className="text-muted-foreground mt-4 mb-6">Pamerkan karya terbaik Anda dengan portofolio digital yang bersih dan profesional. Biarkan proyek Anda berbicara dan menarik klien papan atas.</p>
              <Button variant="outline" asChild>
                <Link href="/profile">Bangun Portofolio Anda</Link>
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
      </main>

      <Footer />
    </div>
  );
}
