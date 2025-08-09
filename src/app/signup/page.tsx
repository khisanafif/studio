
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Logo } from "@/components/logo";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, "Nama harus memiliki minimal 2 karakter."),
  email: z.string().email("Silakan masukkan alamat email yang valid."),
  password: z.string().min(8, "Kata sandi harus memiliki minimal 8 karakter."),
});

export default function SignupPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Di sini Anda biasanya akan menangani pendaftaran pengguna
    // Untuk prototipe ini, kami hanya akan mengarahkan ke dasbord
    router.push('/dashboard');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex flex-col items-center justify-center bg-secondary/30 p-4">
        <div className="mb-8">
          <Logo />
        </div>
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-2xl">Buat Akun</CardTitle>
            <CardDescription>Bergabunglah dengan GigConnect untuk menemukan peluang freelance anda berikutnya.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Lailatul Eky" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="anda@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kata Sandi</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Buat Akun
                </Button>
              </form>
            </Form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Sudah punya akun?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Masuk
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
