
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CareerPathPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard#career-path');
  }, [router]);

  return null;
}
