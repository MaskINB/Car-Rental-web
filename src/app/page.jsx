import Image from "next/image";
import Navbar from "../app/navbar/navbar";
import Link from "next/link";



export default function Home() {
  return (
    <>
    <h1><Link href="/booking">Link</Link></h1>  
    <Navbar/>
    </>
  );
}
