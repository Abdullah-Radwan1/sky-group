import { Sign_up } from "@/components/signup/Sign_up";
import { getDictionary } from "./dictionaries";
export default async function Home ({
  params,
}: {
  params: Promise<{ lang: 'en' | 'ar' }>
}) {
  
  const { lang } = await params
  const dict = await getDictionary(lang) 
   return <Sign_up dict={dict} />;
}
//second test final
