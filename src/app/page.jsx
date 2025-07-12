import Image from "next/image";
import "./globals.css";
import Carousel from "./components/carousel/carousel";
import SecondSection from "./components/SecondSection/SecondSection";
import Thirdsection from "./components/Thirdsection/thirdsection";
import ForthSection from "./components/ForthSection/forthSection";
import Fifthsection from "./components/FifthSection/fifthsection";
import Sixthsection from "./components/SixthSection/sixthsection";
import Footer from "./components/Footer/footer";
import Link from "next/link";



export default function Home() {
  return (
    <>
    <Carousel/>
    <Fifthsection/>
    <SecondSection/>
    <Thirdsection/>
    <ForthSection/>
    <Sixthsection/>
    <Footer/>
    </>
  );
}
