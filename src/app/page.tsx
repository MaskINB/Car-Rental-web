import Image from "next/image";
import "./globals.css";
import Carousel from "./components/carousel/carousel";
import SecondSection from "./components/FirstSection/firstsection";
import Thirdsection from "./components/Thirdsection/thirdsection";
import ForthSection from "./components/ForthSection/forthSection";
import Fifthsection from "./components/FifthSection/fifthsection";
import Sixthsection from "./components/SixthSection/sixthsection";
import Footer from "./components/Footer/footer";
import Link from "next/link";

const Home: React.FC = () => {
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

export default Home;
