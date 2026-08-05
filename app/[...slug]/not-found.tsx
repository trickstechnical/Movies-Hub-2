import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground">
      <h1 className="text-3xl font-bold tracking-tight">Movie not found</h1>
      <p className="max-w-md text-muted-foreground">
        The movie ID in this URL is invalid or no longer available.
      </p>
      <Link
        href="/"
        className="rounded-md border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
      >
        Go back home
      </Link>
    </main>
  );
}