"use client";

import React from 'react';
import HeroCarousel from '../ui/hero-carousel/hero-carousel';
import { cn } from '@/lib/utils';
import Link from 'next/link'; // Assurez-vous d'importer Link de Next.js
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import NumberTicker from "@/components/magicui/number-ticker";
import { useState, useEffect } from "react";
import Image from "next/image";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const images=[
    "/images/immobilier/1.jpg",
    "/images/immobilier/2.jpg",
    "/images/immobilier/3.jpg",
    "/images/immobilier/4.jpg",
    "/images/immobilier/6.jpg",
    "/images/immobilier/7.jpg",
    "/images/immobilier/8.jpg",
    
]

export default function Hero(){
 const [currentIndex, setCurrentIndex] = useState(0);
 
     useEffect(() => {
       const interval = setInterval(() => {
         setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
       }, 3000);
       return () => clearInterval(interval);
     }, []);
   
     return (
       
         <section className=" bg-white">
           <div className="relative w-full h-screen overflow-hidden  bg-white">
         {images.map((image, index) => (
           <Image
             key={index}
             src={image}
             alt={`Slide ${index + 1}`}
             width={800} 
             height={600} 
             className={`absolute w-full h-screen object-cover  transition-opacity duration-1000 blur-sm bg-black/50 ${
               index === currentIndex ? "opacity-100" : "opacity-0"
             }`} 
           />
         ))}
   
         {/* Titre Centré */}
         <div className="absolute inset-0 flex items-center justify-center">
           <h1 className=" text-5xl font-extralight italic text-white  px-4 py-2 rounded-md">
           Trouvez bien plus qu&apos;une maison, trouvez votre chez-vous.
           </h1>
         </div>
   
         {/* Indicateurs */}
         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
           {images.map((_, index) => (
             <div
               key={index}
               className={`w-3 h-3 rounded-full ${
                 index === currentIndex ? "bg-white" : "bg-white"
               }`}
             />
           ))}
         </div>
       </div>
         </section>
     
     );
}