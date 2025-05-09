import { Icons } from "@/components/icons";
import GridPattern from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import Image from 'next/image'; // Import the Image component

export default function SubSection() {
  return (
    <section className="relative">
      <div className="py-8 px-4 md:px-16 mx-auto max-w-screen-xl container lg:py-16">
        <div className="flex flex-col md:flex-row items-center">
          {/* Texte */}
          <div className="max-w-screen-lg text-gray-700 sm:text-lg md:w-1/2 mb-8 md:mb-0">
            <h2 className="mb-4 text-4xl tracking-tight font-bold font-saudagar text-perspectives_marron">
              QUI SOMMES-NOUS
            </h2>
            <p className="font-light text-sm mb-4">
              PersPectives est née d’une véritable passion pour la gestion patrimoine.
            </p>
            <p className="mb-4 text-sm font-light">
              Outre notre savoir-faire et compétence qu’on continue d’enrichir à travers des prestations de service de qualité, un personnel qualifié, expérimenté et investi dans la recherche de l’excellence.
            </p>
            <p className="mb-4 text-sm font-light">
              Quel que soit vos besoins, PersPectives vous accompagne et assiste de la phase initiale à la phase finale en tenant compte de vos besoins afin de vous offrir un service de qualité répondant à vos exigences.
            </p>
            <p className="mb-4 font-light text-sm">
              Nous nous engageons à offrir un service professionnel et honnête, lors de nos prestations en étroite collaboration avec vous.
            </p>
          </div>

          {/* Image section */}
          <div className="md:w-1/2 flex justify-center">
            <Image 
              src="/images/about/4.jpg" // Utilise un chemin relatif
              alt="Qui sommes-nous" 
              className="max-w-full h-auto rounded-lg shadow-lg" // Ajoute des styles pour un meilleur rendu
              width={400} // Specify width
              height={300} // Specify height
              style={{ maxWidth: '400px' }} // Ajuste la taille si nécessaire
            />
          </div>
        </div>
      </div>

      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    </section>
  );
}