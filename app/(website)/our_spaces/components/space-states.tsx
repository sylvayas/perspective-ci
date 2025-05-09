import { Icons } from "@/components/icons";
import GridPattern from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";

export default function SubSection() {
  return (
    <section className="bg-perspectives_marron text-white py-16 px-6 relative overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-extralight text-center mb-12 tracking-wide">
        Nos services
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cardData.map((card, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center text-center p-6 bg-perspectives_orange rounded-xl shadow-lg transition-all duration-300 hover:bg-perspectives_orange hover:shadow-xl hover:-translate-y-1"
          >
            <span className="text-4xl mb-4">{card.icon}</span>
            <h3 className="text-lg font-semibold text-white mb-3">{card.title}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>

     
    </section>
  );
}

const cardData = [
  { icon: "🏢", title: "Finance d'entreprise", description: "Gestion proactive des finances pour maximiser la performance et soutenir l’innovation au sein de l’entreprise." },
  { icon: "💰", title: "Finance personnelle", description: "Planification financière personnalisée pour atteindre vos objectifs et garantir un avenir financier serein." },
  { icon: "📊", title: "Finance de marché", description: "Investissements stratégiques sur les marchés financiers pour maximiser le rendement et gérer les risques." },
  { icon: "🌍", title: "Finance internationale", description: "Gestion des flux financiers internationaux pour stimuler la compétitivité et favoriser la stabilité économique mondiale." },
  { icon: "🏦", title: "Finance bancaire", description: "Gestion des services financiers fournis par les banques, incluant les prêts, l’épargne et les investissements, pour soutenir l’économie." },
  { icon: "📈", title: "Finance d'Investissement", description: "Gestion de portefeuilles d'actifs financiers pour optimiser la rentabilité sur le long terme." },
];

const gridSquares = [
  [4, 4], [5, 1], [8, 2], [5, 3], [5, 5],
  [10, 10], [12, 15], [15, 10], [10, 15],
  [15, 10], [10, 15], [15, 10]
];