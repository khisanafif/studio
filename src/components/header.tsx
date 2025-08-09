
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, UserCircle, Video } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

const navLinks = [
  { href: "/dashboard", label: "Dasboard" },
  { href: "/jobs", label: "Pekerjaan" },
  { href: "/training", label: "Pelatihan" },
  { href: "/m-reels", label: "M-Reels" },
];

export function Header() {
  const pathname = usePathname();

  const renderNavLinks = (isMobile = false) =>
    navLinks.map((link) => {
      const isActive = pathname.startsWith(link.href);
      return (
        <Button
          asChild
          variant={isActive ? "default" : "ghost"}
          key={link.href}
          className={cn(isMobile && "w-full justify-start")}
        >
          <Link
            href={link.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              !isActive && "text-muted-foreground",
              isActive && "hover:text-primary-foreground/90"
            )}
          >
            {link.label}
          </Link>
        </Button>
      );
    });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8 hidden md:flex">
          <Logo />
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Buka Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="p-4">
                <div className="mb-8">
                  <Logo />
                </div>
                <nav className="flex flex-col gap-2">{renderNavLinks(true)}</nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <nav className="hidden md:flex items-center gap-2">
            {renderNavLinks()}
        </nav>

        <div className="flex flex-1 items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Pengaturan</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/">Keluar</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
