import React from "react";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from 'next/image'; // Ajout de l'importation

export default function DescriptionAllSpaces({ offre }: { offre: any }) {
  return (
    <section className="container min-h-[300px] mb-14 relative">
      <div className="relative gap-8 items-center md:items-stretch py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
        <Image
          className="w-full z-10 object-cover"
          src={offre.image}
          alt="dashboard image"
          width={800} // Remplacez par la largeur souhaitée
          height={500} // Remplacez par la hauteur souhaitée
        />
        <div className="mt-4 md:mt-0">
          <h2 className="mb-4 text-2xl md:text-4xl tracking-tight font-saudagar">
            {offre.title}
          </h2>
          {offre.description &&
            offre.description.map((des: any, key: number) => (
              <p
                key={key}
                className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400"
              >
                {des}
              </p>
            ))}

          {offre.horraires && (
            <ul className="my-10 px-5 mt-2 space-y-1 list-disc list-inside">
              <p className="text-gray-500 md:text-lg dark:text-gray-400 text-xl font-semi-bold">
                Horraires
              </p>
              {offre.horraires.map((horraire: any, key: number) => (
                <div key={key} className="mb-2">
                  <li>{horraire.name}</li>
                  <div className="ml-5 font-light">{horraire.horraire}</div>
                </div>
              ))}
            </ul>
          )}
          {offre.tarifs && (
            <div className="pb-6">
              <p className="uppercase md:text-lg dark:text-gray-400 text-xl font-sbold">
                Tarifs
              </p>
              <ul className="space-y-4 list-decimal list-inside">
                {offre.tarifs.map((tarif: any, key: number) => (
                  <li key={key} className="text-sm md:text">
                    {tarif.name} : {tarif.horraire}
                    <ol className="ps-5 mt-2 space-y-1 list-disc list-inside">
                      {tarif.items &&
                        tarif.items.map((item: any, k: number) => (
                          <div key={k}>
                            <li className="font-light">
                              {item.title}{" "}
                              <span className="ml-2">{"=>"}</span>{" "}
                              <span className="ml-2">{item.price}</span>
                            </li>
                            <p className="text-gray-300 text-xs md:text-sm">
                              {item.description}{" "}
                            </p>
                          </div>
                        ))}
                    </ol>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            className={cn(
              buttonVariants({ size: "sm" }),
              "max-w-52 gap-2 overflow-hidden whitespace-pre",
              "group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
            )}
            href={offre.bookingLink ?? `/reservation`}
          >
            <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
            <div className="flex items-center">
              <span className="ml-1 text-sm sm:text-md">Réservez</span>{" "}
            </div>
          </Link>
        </div>
      </div>

      {offre.avantages && (
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-xl md:text-4xl font-saudagar tracking-tight">
              Avantages
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-6 lg:mb-16">
            {offre.avantages.map((avantage: any, key: number) => (
              <div key={key} className="items-center flex flex-col bg-gray-50 rounded-lg shadow">
                <Image
                  className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                  src={avantage.image}
                  alt={avantage.title} // Utilisez un titre ou une description comme alt
                  width={800} // Spécifiez la largeur
                  height={500} // Spécifiez la hauteur
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {avantage.title}
                  </h3>
                  <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                    {avantage.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {offre.elements && (
        <div className="bg-gray-900 py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-xl md:text-4xl tracking-tight font-saudagar font-extrabold text-white">
              C&apos;est compris dans le prix !
            </h2>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            {offre.elements.map((el: any, key: number) => (
              <div key={key}>
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <span className="text-4xl">{el.icon}</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{el.title}</h3>
                <p className="text-gray-400">{el.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <AnimatedGridPattern
        numSquares={50}
        maxOpacity={0.1}
        duration={2}
        repeatDelay={1}
        className={
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] inset-x-0 w-full h-[100%]"
        }
      />
    </section>
  );
}