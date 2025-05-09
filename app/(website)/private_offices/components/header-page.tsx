import { Icons } from "@/components/icons";
import NumberTicker from "@/components/magicui/number-ticker";
import Image from "next/image";


export default function HeaderPage() {

    return (
        <>
            <section className="relative ">
                <div className="container px-0 relative max-w-[1400px] h-[410px]">
                    <div className="relative z-[2]  flex flex-col md:flex-row md:gap-x-8 justify-between bg-black/30 h-[410px] py-8 px-4 sm:py-16 lg:px-8">
                        <div className="max-w-screen-sm text-white text-center md:text-left">
                            <h2 className="mb-4 text-xl sm:text-2xl font-saudagar md:text-3xl lg:text-4xl tracking-tight font-semibold mt-20">
                            Optimisez vos trajets avec des solutions de transport sur mesure.</h2>                            
                            <p className="mb-8 font-light text-xs sm:text-sm">Bienvenue au sein de Perspectives à Cocody</p>
                        </div>
                        <div className=" flex flex-col gap-2 md:gap-4">
                            <div className="flex min-w-64 gap-2 bg-perspectives_orange rounded-sm p-2 mt-20 text-white">
                                <Icons.building className="size-4 md:size-6" />
                                <p className="font-medium text-sm font-mono whitespace-pre-wrap tracking-tighter "><NumberTicker className="text-white mr-2" value={13} />Véhicules en service</p>
                            </div>
                            <div className="flex min-w-64 gap-2 bg-perspectives_orange rounded-sm p-2 text-white">
                                <Icons.laptop className="size-4 md:size-6" />
                                <p className="font-medium text-sm font-mono whitespace-pre-wrap tracking-tighter "><NumberTicker className="text-white mr-2" value={200} />Trajets effectués</p>
                            </div>
                            <div className="flex min-w-64 gap-2 bg-perspectives_orange rounded-sm p-2 text-white">
                                <Icons.user className="size-4 md:size-6" />
                                <p className="font-medium text-sm font-mono whitespace-pre-wrap tracking-tighter "><NumberTicker className="text-white mr-2" value={40} />Clients satisfaits</p>
                            </div>
                        </div>
                    </div>
                    {/* image background */}
                    <Image
                        src="/images/transport/camion_transport.jpg"  // Chemin vers l'image
                        alt="Vue d'un espace de travail moderne"  // Texte alternatif pour l'accessibilité
                        layout="fill"  // Pour remplir la section
                        objectFit="cover"  // Pour couvrir toute la section
                        quality={100}  // Qualité de l'image (vous pouvez ajuster)
                        priority  // Si vous voulez que l'image soit chargée en priorité
                        className="absolute inset-0"  // Pour assurer que l'image occupe tout l'espace
                    />
            
            </div>
            </section >

        </>
    );
}