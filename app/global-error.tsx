'use client';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string },
  reset: () => void,
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
      </body>
    </html>
  )
}