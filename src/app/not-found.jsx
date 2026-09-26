export default function NotFound() {
  return (
    <main className="w-full h-screen flex-col gap-y-5 text-center center ">
      <h1 className="text-8xl">404 </h1>
      <p className="text-4xl">Page Not Found</p>
      <a href="/" className="text-sm uppercase hover:underline">Go back to home</a>
    </main>
  );
}
