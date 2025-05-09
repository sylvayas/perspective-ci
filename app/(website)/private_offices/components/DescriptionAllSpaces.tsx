"use client";

import React from "react";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern"; // Verify this export
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"; // Verify this export
import { cn } from "@/lib/utils"; // Verify this export
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BorderBeam } from "@/components/magicui/border-beam"; // Verify this export

export default function DescriptionAllSpaces() {
  const { ref: sectionRef, inView: sectionInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: servicesRef, inView: servicesInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const avantages = [
    {
      title: "Transport maritime",
      description: "Ce type de transport est essentiel pour le commerce international et le transport de grandes quantités de marchandises, en particulier sur de longues distances.",
      image: "/images/transport/transport_maritime.jpg",
    },
    {
      title: "Transport aérien",
      description: "Le transport aérien fait référence à l'utilisation d'avions pour déplacer des passagers et des marchandises d'un endroit à un autre à travers l'air.",
      image: "/images/transport/transport_aérien.jpg",
    },
    {
      title: "Transport terrestre",
      description: "Le transport terrestre désigne tous les modes de transport qui utilisent des voies terrestres, telles que les routes, les autoroutes, les chemins de fer ou même des pistes non pavées, pour déplacer des personnes ou des marchandises.",
      image: "/images/transport/transport_terrestre.jpg",
    },
    {
      title: "Transport ferroviaire",
      description: "Le transport ferroviaire est un mode de transport qui utilise des trains circulant sur des voies ferrées pour transporter des passagers et des marchandises.",
      image: "/images/transport/transport_ferroviaire.jpg",
    },
  ];

  return (
    <section className="container min-h-[400px] py-16 relative overflow-hidden" ref={sectionRef}>
   
      {/* Première section : Image + Texte */}
      <div className="relative flex flex-col md:flex-row gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative rounded-lg overflow-hidden shadow-lg w-full md:w-1/2"
        >
          <Image
            className="w-full h-full object-cover"
            src="/images/perspective/camion_transport.jpg"
            alt="Camion de transport logistique"
            width={800}
            height={500}
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
            Dans le secteur du transit et du transport, nous proposons des services essentiels tels que le dédouanement, le transport
            de marchandises et de matières premières. Notre équipe d’experts facilite les formalités douanières, garantissant une circulation
            rapide et efficace de vos produits à travers les frontières. Grâce à notre réseau logistique bien établi, nous assurons un transport
            sécurisé et fiable, vous permettant de vous concentrer sur vos activités commerciales sans vous soucier des délais.
          </p>
         
        </motion.div>
      </div>

      {/* Section des services */}
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6" ref={servicesRef}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={servicesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-12 text-3xl md:text-4xl font-saudagar tracking-tight text-gray-900"
        >
          Nos services
        </motion.h2>

        <div className="flex flex-wrap gap-8 justify-center">
          {avantages.map((avantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden w-full sm:w-[calc(50%-2rem)] md:w-[calc(25%-2rem)] group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <Image
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  src={avantage.image}
                  alt={avantage.title}
                  width={800}
                  height={600}
                  quality={85}
                />
                <BorderBeam className="z-10" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2">{avantage.title}</h3>
                <p className="mt-2 mb-4 font-light text-gray-600 flex-grow">{avantage.description}</p>
                <Link
                  href="/services"
                  className={cn(
                    buttonVariants(),
                    "bg-perspectives_orange hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-fit flex items-center gap-2 text-sm opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 transition-all duration-300"
                  )}
                  aria-label={`En savoir plus sur ${avantage.title}`}
                >
                  {/* Fallback SVG for Icons.info */}
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Détails
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}