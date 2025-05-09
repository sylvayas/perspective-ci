import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link"; // Assurez-vous d'importer Link
import { CalendarIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import HeroCarousel from "@/components/ui/hero-carousel/hero-carousel";

const images = [
    "/images/commerce_géneral/fer_a_repasser.jpg",
    "/images/commerce_géneral/frigo2.jpg",
    "/images/commerce_géneral/gasinière.jpg",
    "/images/commerce_géneral/frigo.jpg",
  ];

export default function HeaderPage() {
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
          Les appareils electroménagers de qualité
          </h1> 
        </div>
        <HeroCarousel images={images} />
      </div>
    </section>
  );
}