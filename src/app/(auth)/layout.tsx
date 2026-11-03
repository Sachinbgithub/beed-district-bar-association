import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <Link href="/" className="mb-8 font-semibold text-[var(--navy)]">
        {siteConfig.name}
      </Link>
      {children}
    </div>
  );
}
