import React from "react";
import HeroCarousel from "../ui/hero-carousel/hero-carousel";
import { cn } from "@/lib/utils";
import Link from "next/link"; // Assurez-vous d'importer Link
import { CalendarIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const images = [
  "/images/finance/analyse financière.jpg",
  "/images/immobilier/marchandage maison.jpg",
  "/images/transport/un homme.jpg",
  "/images/commerce_géneral/commerce.jpg",
];

export default function Hero() {
  const item_bar = (
    <div className="w-full h-[2px] scale-x-0 bg-perspectives_orange group-hover/service_item:scale-x-100 group-hover/service_item:bg-white transition-all duration-300"></div>
  );

  const item = (name: string, url: string) => {
    return (
      <Link href={url} className="relative group/service_item">
        <span className="font-merriweather text-xs sm:text-sm">{name}</span>
        {item_bar}
      </Link>
    );
  };

  return (
    <section className="relative">
      <div className={cn("h-[60vh] md:h-[418px] xl:h-[518px] relative container px-0 max-w-[1400px]")}>
        <div className="absolute z-[3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center flex-col gap-8 max-w-5xl w-full">
          <h1 className="text-lg sm:text-xl md:text-4xl text-white text-center font-lora uppercase">
          Allons loin ensemble
          </h1>

          <div className="flex items-center justify-center text-white flex-wrap gap-2">
            {item("FINANCE", "/our_spaces")}
            <span className="h-4 w-[2px] bg-white"></span>
            {item("IMMOBILIER-LOGISTIQUE", "/our_spaces/open_space")}
            <span className="h-4 w-[2px] bg-white"></span>
            {item("TRANSIT–TRANSPORT", "/our_spaces/meeting_room")}
            <span className="h-4 w-[2px] bg-white"></span>
            {item("COMMERCE GÉNÉRAL", "/our_spaces/common_space")}
          </div>
{/* 
          <Link
            className={cn(
              buttonVariants(),
              "max-w-52 gap-2 overflow-hidden whitespace-pre",
              "group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
            )}
            href="/reservation" // Lien vers la page de réservation
          >
            <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
            <div className="flex items-center">
              <span className="ml-1">Réserver</span>
            </div>
            <div className="ml-2 flex items-center gap-1 text-sm md:flex">
              <CalendarIcon className="size-4 text-white transition-all duration-300 group-hover:text-novis_orange" />
            </div>
          </Link> */}
        </div>
        <HeroCarousel images={images} />
      </div>
    </section>
  );
}