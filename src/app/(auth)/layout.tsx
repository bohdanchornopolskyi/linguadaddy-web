export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col flex-grow items-center justify-center p-4">
      {children}
    </div>
  );
}
