import TitleSection from '@/components/title-section';
import React from 'react';
import { BorderBeam } from "@/components/magicui/border-beam";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from 'next/image';

export default function DescriptionAllSpaces() {
    return (
        <section className="container min-h-[400px] py-16 relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">

            <div className="relative gap-8 items-center py-10 px-6 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-8">
                <div className="relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
                    <Image 
                        className="w-full h-full object-cover" 
                        src="/images/finance/business-people.jpg" 
                        alt="finance image" 
                        width={800} 
                        height={600} 
                        priority
                    />
                    <BorderBeam className="absolute inset-0" />
                </div>
                <div className="mt-6 md:mt-0 flex flex-col justify-center">
                    <p className="mb-6 font-light text-justify text-gray-600 md:text-lg dark:text-gray-300 leading-relaxed transition-colors duration-300">
                        Nous proposons des services financiers diversifiés, adaptés aux besoins des particuliers et des entreprises. 
                        Notre expertise couvre des domaines tels que la gestion de patrimoine, le conseil en investissement, 
                        ainsi que l&apos;analyse financière et la planification budgétaire. Nous nous engageons à fournir des solutions 
                        personnalisées qui maximisent le rendement de vos investissements tout en minimisant les risques associés. 
                        Notre équipe d&apos;experts financiers vous accompagne à chaque étape, vous permettant de prendre des décisions 
                        éclairées pour atteindre vos objectifs financiers à court et long terme.
                    </p>
                 
                </div>
            </div>

            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.1}
                duration={3}
                className={cn(
                    "absolute inset-0 h-full w-full",
                    "opacity-50 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
                )}
            />
        </section>
    );
}