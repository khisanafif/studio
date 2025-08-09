import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Twitter, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">Freelance for Fresh Graduate Gen-Z</p>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary">Dasbord</Link></li>
              <li><Link href="/jobs" className="text-sm text-muted-foreground hover:text-primary">Pekerjaan</Link></li>
              <li><Link href="/profile" className="text-sm text-muted-foreground hover:text-primary">Profil</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Sumber Daya</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Pusat Bantuan</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Ketentuan Layanan</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Ikuti Kami</h3>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" asChild><a href="#"><Twitter className="h-5 w-5" /></a></Button>
              <Button variant="ghost" size="icon" asChild><a href="#"><Facebook className="h-5 w-5" /></a></Button>
              <Button variant="ghost" size="icon" asChild><a href="#"><Instagram className="h-5 w-5" /></a></Button>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GigConnect. ZORO GEMASTIK XVIII.</p>
        </div>
      </div>
    </footer>
  );
}
