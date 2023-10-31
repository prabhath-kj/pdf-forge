"use client"
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <head>
        <style>{`
          body {
            @apply font-sans m-0 p-0 flex flex-col items-center justify-center h-screen bg-gray-100;
          }

          h2 {
            @apply text-red-500 text-2xl mb-4;
          }

          button {
            @apply px-4 py-2 text-white bg-blue-500 rounded cursor-pointer;
          }

          @media screen and (max-width: 600px) {
            h2 {
              @apply text-xl mb-2;
            }

            button {
              @apply text-sm;
            }
          }
        `}</style>
      </head>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
