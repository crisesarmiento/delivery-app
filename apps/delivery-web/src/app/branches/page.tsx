'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const BranchesRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home since home is already functioning as the branches page
    router.replace('/');
  }, [router]);

  // Return an empty div while redirecting
  return <div></div>;
};

export default BranchesRedirect;
