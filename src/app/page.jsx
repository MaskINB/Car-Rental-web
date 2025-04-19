import Image from "next/image";
import Carousel from "./components/carousel/carousel";
import Secondsection from "./components/Secondsection/secondsection"
import Thirdsection from "./components/Thirdsection/thirdsection";
import ForthSection from "./components/ForthSection/forthSection";
import Fifthsection from "./components/FifthSection/fifthsection";
import Sixthsection from "./components/SixthSection/sixthsection";
import Link from "next/link";



export default function Home() {
  return (
    <>
    <Carousel/>
    <Secondsection/>
    <Thirdsection/>
    <ForthSection/>
    <Fifthsection/>
    <Sixthsection/>
    </>
  );
}
