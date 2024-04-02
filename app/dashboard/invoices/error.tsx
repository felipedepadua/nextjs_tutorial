'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}


// EXTRA:
// FROM: https://nextjs.org/learn/dashboard-app/error-handling#handling-404-errors-with-the-notfound-function
// Something to keep in mind: not-found.tsx will take precedence over error.tsx, so you can reach out for
// the former when you want to handle more specific errors!
// error.tsx is a catch-all for any error that occurs in the application.