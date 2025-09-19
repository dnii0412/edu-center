"use client";

import PillNav from "@/components/PillNav";
import GridDistortion from "@/components/GridDistortion";
import Counter from "@/components/Counter";
import SplitText from "@/components/SplitText";
import { useCounter } from "@/hooks/useCounter";

export default function HomePageClient() {
  const { count } = useCounter({
    startValue: 0,
    endValue: 350,
    duration: 6000, // 6 seconds
    autoStart: true
  });

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <PillNav
        logo="/logo.svg"
        items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }]}
        activeHref="/"
      />
      <section className="w-full h-screen">
        <GridDistortion imageSrc="/download (1).png" />
      </section>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center">
        <div className="mb-8">
          <SplitText
            className="text-white text-8xl font-bold text-center drop-shadow-2xl"
            delay={1}
            duration={1.2}
            stagger={0.05}
          >
            Hero Title
          </SplitText>
        </div>

        <div className="flex flex-col items-center">
          <p className="shiny-text text-2xl font-bold mb-3">Happy Graduation</p>
          <div className="scale-75">
            <Counter value={count} />
          </div>
        </div>
      </div>
    </div>
  );
}
