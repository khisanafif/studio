import { Briefcase } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="https://ibb.co.com/9mRcZVCf" className="flex items-center gap-2 group">
      <div className="p-2 bg-primary/10 group-hover:bg-primary/20 rounded-lg transition-colors">
        <Briefcase className="h-6 w-6 text-primary" />
      </div>
      <span className="text-xl font-bold font-headline text-foreground">GigConnect</span>
    </Link>
  );
}
