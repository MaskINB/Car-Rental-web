"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Carousel from "./components/carousel/carousel";
import Secondsection from "./components/Secondsection/secondsection";
import Thirdsection from "./components/Thirdsection/thirdsection";
import ForthSection from "./components/ForthSection/forthSection";
import Fifthsection from "./components/FifthSection/fifthsection";
import Sixthsection from "./components/SixthSection/sixthsection";
import Footer from "./components/Footer/footer";
import SmoothScroll from "./components/animation/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  const forthRef = useRef(null);
  const fifthRef = useRef(null);
  const sixthRef = useRef(null);

  useEffect(() => {
    const refs = [secondRef, thirdRef, forthRef, fifthRef, sixthRef];

    refs.forEach((ref) => {
      if (ref.current) {
        gsap.from(ref.current, {
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <SmoothScroll>
      <div className="border-green-500">
        <Carousel />
        <div ref={secondRef} className="mb-16">
          <Secondsection />
        </div>
        <div ref={thirdRef} className="mb-16">
          <Thirdsection />
        </div>
        <div ref={forthRef} className="mb-16">
          <ForthSection />
        </div>
        <div ref={fifthRef} className="mb-16">
          <Fifthsection />
        </div>
        <div ref={sixthRef} className="mb-16">
          <Sixthsection />
        </div>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
