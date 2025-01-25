export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-4 py-12 md:py-24">
      {children}
    </div>
  );
}
