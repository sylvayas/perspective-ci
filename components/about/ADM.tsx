import TitleSection from '@/components/title-section';
import React from 'react';
import GridPattern from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import Image from 'next/image'; // Ajout de l'importation

export default function ADM() {
    return (
        <section className="container min-h-[300px] py-14 relative">
            <TitleSection title='NOTRE ADN' />

            <div className="relative py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div className="relative isolate grid lg:grid-cols-2 items-center gap-y-10 lg:gap-y-6 gap-x-12 lg:gap-x-12">
                    <div className="relative self-stretch w-full max-w-full lg:max-w-[598px]">
                        <div className="relative h-full col-span-1 row-span-1">
                            <div className="absolute skew-y-12 bottom-8 md:bottom-16 top-0 left-0 right-0 bg-perspectives_orange rounded-3xl shadow-2xl" />
                            <div className="relative flex justify-center items-center h-full z-[1] pt-8 px-8">
                                <div className="w-full sm:max-w-[80%] md:max-w-[60%] border-2 shadow-2xl rounded-2xl lg:rounded-3xl border-white relative top-auto bottom-auto mx-auto flex justify-center flex-col">
                                    <Image
                                        alt="App screenshot"
                                        src="/images/coworkers/coworker (7).jpg"
                                        className="w-full h-full object-cover rounded-2xl lg:rounded-3xl"
                                        width={800} // Remplacez par la largeur souhaitée
                                        height={500} // Remplacez par la hauteur souhaitée
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-left mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400 text-custom-justify">
                            Perspectives  est un tiers lieu à la disposition de l&apos;écosystème entrepreneurial ivoirien fondé en 2024 par Edyeh ANOUMAN KACOU...
                        </p>
                    </div>
                    <GridPattern
                        squares={[
                            [2, 2],
                            [3, 1],
                            [4, 1],
                            [2, 1],
                            [3, 3],
                            [5, 5],
                            [6, 8],
                            [8, 5],
                            [5, 4],
                            [4, 5],
                            [5, 4],
                            [4, 5],
                        ]}
                        className={cn(
                            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                            "inset-x-0 inset-y-[-30%] h-full skew-y-12",
                        )}
                    />
                </div>
                <dl className="col-span-2 mt-16 grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                    {/* Votre contenu de description */}
                </dl>
            </div>
        </section>
    );
}