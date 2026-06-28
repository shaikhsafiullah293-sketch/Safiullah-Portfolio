import Image from "next/image";
import Banner from "@/components/Banner";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact  from "@/components/Contact";
import { Header } from "@/components/Header";
import Footer  from "@/components/Footer";
import Services from "@/components/Services";
export default function Home() {
  return (
    <main>

  <section>
    <Header/>
<Banner/>
<Skills/>
<Services/>
<Projects/>
<Experience/>
<Contact/>
<Footer/>
  </section>
    </main>
  );
}
