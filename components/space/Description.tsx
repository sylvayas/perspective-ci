"use client";

import TitleSection from "@/components/title-section";
import React, { useState } from "react";
import { BorderBeam } from "@/components/magicui/border-beam";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ServicesCarousel from "../website/Services/services-carousel";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Icons } from "../icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Property {
  src: string;
  alt: string;
  width: number;
  height: number;
  apartment: string;
}

// Propriétés principales
export const mainProperties: Property[] = [
  { src: "/images/Apparts/Appart B/Chambre 2.png", alt: "Chambre 2 - Appartement B", width: 800, height: 500, apartment: "Appartement B" },
  { src: "/images/Apparts/Appart B/Chambre 1.png", alt: "Chambre 1 - Appartement B", width: 800, height: 500, apartment: "Appartement B" },
  { src: "/images/Apparts/Appart B/Salon B 1.0.png", alt: "Salon B 1.0 - Appartement B", width: 800, height: 500, apartment: "Appartement B" },
  { src: "/images/Apparts/Appart B/Salon B 1.1.png", alt: "Salon B 1.1 - Appartement B", width: 800, height: 500, apartment: "Appartement B" },
  { src: "/images/Apparts/Appart B/Salon B 1.2.png", alt: "Salon B 1.2 - Appartement B", width: 800, height: 500, apartment: "Appartement B" },

  { src: "/images/Apparts/Appart B23/Chambre Principale.png", alt: "Chambre Principale - Appartement B23", width: 800, height: 500, apartment: "Appartement B23" },
  { src: "/images/Apparts/Appart B23/Salon 1.0.png", alt: "Salon 1.0 - Appartement B23", width: 800, height: 500, apartment: "Appartement B23" },
  { src: "/images/Apparts/Appart B23/Salon 1.1.png", alt: "Salon 1.1 - Appartement B23", width: 800, height: 500, apartment: "Appartement B23" },

  { src: "/images/Apparts/Appart Pressing/IMG_0704.DNG.png", alt: "Salon - Appartement Pressing", width: 800, height: 500, apartment: "Appartement Pressing" },
  { src: "/images/Apparts/Appart Pressing/IMG_0686.DNG.png", alt: "Salle a manger - Appartement Pressing", width: 800, height: 500, apartment: "Appartement Pressing" },
  { src: "/images/Apparts/Appart Pressing/IMG_0722.DNG.png", alt: "Salon - Appartement Pressing", width: 800, height: 500, apartment: "Appartement Pressing" },

  { src: "/images/Apparts/Appart Prima/IMG_1545.DNG.png", alt: "Cuisine - Appartement Prima", width: 800, height: 500, apartment: "Appartement Prima" },
  { src: "/images/Apparts/Appart Prima/IMG_1555.DNG.png", alt: "Mini salle a manger - Appartement Prima", width: 800, height: 600, apartment: "Appartement Prima" },
  { src: "/images/Apparts/Appart Prima/IMG_1556.DNG.png", alt: "Salon luxueux - Appartement Prima", width: 800, height: 600, apartment: "Appartement Prima" },

  { src: "/images/Apparts/Appart Soleil/Soleil 1.0.4.png", alt: "Chambre luxueuse - Appartement Soleil", width: 800, height: 500, apartment: "Appartement Soleil" },
  { src: "/images/Apparts/Appart Soleil/Soleil 1.0.2.png", alt: "Salon - Appartement Soleil", width: 800, height: 500, apartment: "Appartement Soleil" },
  { src: "/images/Apparts/Appart Soleil/Soleil 1.0.7.png", alt: "Chambre - Appartement Soleil", width: 800, height: 500, apartment: "Appartement Soleil" },

  { src: "/images/Apparts/Complexe Carré Massina/Appart/IMG_1055.DNG.png", alt: "Chambre - Complexe Carré Massina", width: 800, height: 500, apartment: "Complexe Carré Massina" },
  { src: "/images/Apparts/Complexe Carré Massina/Appart/IMG_0983.DNG.png", alt: "Salon - Complexe Carré Massina", width: 800, height: 500, apartment: "Complexe Carré Massina" },
  { src: "/images/Apparts/Complexe Carré Massina/Appart/IMG_0971.DNG_1.png", alt: "Cuisine - Complexe Carré Massina", width: 800, height: 500, apartment: "Complexe Carré Massina" },
];

// Autres propriétés
export const otherProperties: Property[] = [
  { src: "/images/Apparts/Complexe Carré Massina/Salles de conf/1/IMG_0919.DNG.png", alt: "Chambre élégante - Salles de conf", width: 800, height: 500, apartment: "Salles de conf" },
  { src: "/images/Apparts/Complexe Carré Massina/Salles de conf/2/IMG_0909.DNG.png", alt: "Salon luxueux - Salles de conf", width: 800, height: 600, apartment: "Salles de conf" },
  { src: "/images/Apparts/Complexe Carré Massina/Salles de conf/3/IMG_0881.DNG.png", alt: "Espace extérieur - Salles de conf", width: 800, height: 500, apartment: "Salles de conf" },
];

// Grouper les propriétés par appartement
const groupPropertiesByApartment = (properties: Property[]) => {
  const grouped: { [key: string]: Property[] } = {};
  properties.forEach((property) => {
    if (!grouped[property.apartment]) {
      grouped[property.apartment] = [];
    }
    grouped[property.apartment].push(property);
  });
  return grouped;
};

const mainGroupedProperties = groupPropertiesByApartment(mainProperties);
const otherGroupedProperties = groupPropertiesByApartment(otherProperties);

export default function DescriptionAllSpaces() {
  const { ref: sectionRef, inView: sectionInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: showcaseRef, inView: showcaseInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [sliderIndices, setSliderIndices] = useState<{ [key: string]: number }>({});

  const goToPrevious = (apartment: string, images: Property[]) => {
    setSliderIndices((prev) => ({
      ...prev,
      [apartment]: (prev[apartment] || 0) === 0 ? images.length - 1 : (prev[apartment] || 0) - 1,
    }));
  };

  const goToNext = (apartment: string, images: Property[]) => {
    setSliderIndices((prev) => ({
      ...prev,
      [apartment]: ((prev[apartment] || 0) + 1) % images.length,
    }));
  };

  return (
    <>
      <section className="container min-h-[400px] py-16 relative bg-gray-50" ref={sectionRef}>
        <div className="relative flex flex-col md:flex-row gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative rounded-lg overflow-hidden shadow-lg w-full md:w-1/2"
          >
            <Image
              className="w-full h-full object-cover"
              src="/images/immobilier/maison_immobilier.jpg"
              alt="Vue d'une propriété immobilière"
              width={900}
              height={600}
              quality={100}
              priority
            />
            <BorderBeam className="z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 md:mt-0 flex flex-col justify-center w-full md:w-1/2"
          >
            <p className="mb-6 text-justify text-gray-600 md:text-lg leading-relaxed">
              Nous proposons une gamme complète de services en immobilier et logistique : intermédiation pour l’achat
              et la vente, location de biens meublés ou non, gestion immobilière, conseil en projets de construction, et
              fourniture de matériel. Nos solutions incluent également la location de hangars, plateformes, et
              entrepôts, adaptées à vos besoins logistiques.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="showcase" className="container px-4 md:px-8 py-16" ref={showcaseRef}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={showcaseInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-novis_yellow mb-12 text-center font-medium text-3xl md:text-4xl tracking-tight font-saudagar"
        >
          Galerie des propriétés
        </motion.h2>

        <Tabs defaultValue="main" className="mt-8">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="main">Propriétés principales</TabsTrigger>
            <TabsTrigger value="other">Salle de réunion</TabsTrigger>
          </TabsList>
          <TabsContent value="main" className="mt-6">
            <div className="flex flex-wrap gap-6 justify-center">
              {Object.entries(mainGroupedProperties).map(([apartment, images], index) => (
                <motion.div
                  key={apartment}
                  initial={{ opacity: 0, y: 20 }}
                  animate={showcaseInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative rounded-lg shadow-md overflow-hidden group w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative w-full h-[300px]">
                    {images.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          imgIndex === (sliderIndices[apartment] || 0) ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Image
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          quality={85}
                        />
                      </div>
                    ))}
                    <button
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
                      onClick={() => goToPrevious(apartment, images)}
                      aria-label="Image précédente"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
                      onClick={() => goToNext(apartment, images)}
                      aria-label="Image suivante"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </div>
                  <BorderBeam className="z-10" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col gap-2">
                    <p className="text-white font-medium text-sm">{apartment}</p>
                    <Link
                      className={cn(
                        buttonVariants(),
                        "max-w-32 md:max-w-48 gap-2 overflow-hidden whitespace-pre",
                        "group relative w-full justify-center gap-2 rounded-md transition-all opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
                      )}
                      href={`/reservation?apartment=${encodeURIComponent(apartment)}`}
                    >
                      <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
                      <div className="flex items-center">
                        <Icons.calendar className="size-4" />
                        Réservez
                      </div>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="other" className="mt-6">
            <div className="flex flex-wrap gap-6 justify-center">
              {Object.entries(otherGroupedProperties).map(([apartment, images], index) => (
                <motion.div
                  key={apartment}
                  initial={{ opacity: 0, y: 20 }}
                  animate={showcaseInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative rounded-lg shadow-md overflow-hidden group w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative w-full h-[300px]">
                    {images.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          imgIndex === (sliderIndices[apartment] || 0) ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Image
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          quality={85}
                        />
                      </div>
                    ))}
                    <button
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
                      onClick={() => goToPrevious(apartment, images)}
                      aria-label="Image précédente"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
                      onClick={() => goToNext(apartment, images)}
                      aria-label="Image suivante"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </div>
                  <BorderBeam className="z-10" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col gap-2">
                    <p className="text-white font-medium text-sm">{apartment}</p>
                    <Link
                      href={`/reservation?apartment=${encodeURIComponent(apartment)}`}
                      className={cn(
                        buttonVariants(),
                        "bg-perspectives_orange hover:bg-novis_yellow/90 text-black font-semibold py-2 px-4 rounded-lg w-fit flex items-center gap-2 text-sm opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 transition-all duration-300"
                      )}
                      aria-label={`Réserver ${apartment}`}
                    >
                      <Icons.calendar className="size-4" />
                      Réserver
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}