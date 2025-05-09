import TitleSection from '@/components/title-section';
import React from 'react';
import { BorderBeam } from "@/components/magicui/border-beam";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from 'next/image'; // Ajout de l'importation

export default function DescriptionCom() {
    return (
        <section className="container min-h-[300px] py-14 relative">
            <div className="relative gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                <Image className="w-full h-full object-cover" src="/images/commerce_géneral/E-commerce.jpg" alt="finance image" width={800} height={600} />
                <div className="mt-4 md:mt-0">
                    <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                        Nous somme spécialisé dans le commerce général , offrant une large gamme de service incluant l&apos;import-export la vente d&apos;appareil électroménagers , ainsi que le 
                        suivi des ventes et les recouvrements.Notre expertise nous permet de garantir une sélection de produits de qualité, tout en mettant en place des système efficace
                        pour optimiser vos transactions.De plus, notre service après-vente (SAV) assure un soutient continu pour garantir la satisfaction de nos clients après l&apos;achat
                    </p>
                    
                </div>



            </div>

        </section>
    );
}