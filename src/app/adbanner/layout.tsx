export default function AdBannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {children}
    </div>
  );
}
