import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const skills = ["React", "Next.js", "TypeScript", "Node.js", "GraphQL", "Desain UI/UX", "Figma", "Strategi Produk"];
const portfolio = [
  { title: "Platform E-commerce", description: "Situs e-commerce full-stack dengan CMS kustom.", image: "https://placehold.co/600x400.png", dataAiHint: "website ecommerce" },
  { title: "Dasbor SaaS", description: "Dasbor analitik untuk perusahaan perangkat lunak B2B.", image: "https://placehold.co/600x400.png", dataAiHint: "dashboard analytics" },
  { title: "Aplikasi Perbankan Seluler", description: "Desain UI/UX untuk aplikasi perbankan seluler generasi berikutnya.", image: "https://placehold.co/600x400.png", dataAiHint: "mobile app" },
];
const experience = [
  { role: "Pengembang Frontend Senior", company: "Tech Solutions Inc.", period: "2021 - Sekarang" },
  { role: "Desainer UI/UX", company: "Creative Minds", period: "2019 - 2021" },
];

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary">
                <AvatarImage src="https://placehold.co/100x100.png" alt="Avatar Pengguna" data-ai-hint="profile picture" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-headline font-bold">Alex Doe</h2>
              <p className="text-muted-foreground">Pengembang Frontend & Penggemar UI/UX</p>
              <div className="flex justify-center gap-4 mt-4">
                <Button variant="ghost" size="icon" asChild><a href="#"><Mail className="h-5 w-5" /></a></Button>
                <Button variant="ghost" size="icon" asChild><a href="#"><Github className="h-5 w-5" /></a></Button>
                <Button variant="ghost" size="icon" asChild><a href="#"><Linkedin className="h-5 w-5" /></a></Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Keahlian</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {skills.map(skill => <Badge key={skill}>{skill}</Badge>)}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Tentang Saya</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Pengembang yang bersemangat dengan pengalaman 5+ tahun dalam membangun aplikasi web yang skalabel dan ramah pengguna. Saya berkembang dalam memecahkan masalah kompleks dan menciptakan antarmuka yang indah dan intuitif. Mencari tantangan berikutnya di dunia lepas.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Pengalaman Kerja</CardTitle>
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
            <h2 className="text-2xl font-headline font-bold mb-4">Portofolio Digital</h2>
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
