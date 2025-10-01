// src/app/[lang]/page.tsx
import { Sign_up } from "@/components/signup/Sign_up";

export default function Home({ params }: { params: { lang: string } }) {
  return <Sign_up />;
}

// 👇 Add this so Next.js pre-builds /en and /ar
export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}
