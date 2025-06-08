import Image from "next/image";
import typeColors from "@/utils/typeColors";
import useInView from "@/hooks/useInView";
import type { Pokemon } from "@/types/pokemon";

type PokemonCardProps = {
  pokemon: Pokemon;
  onClick?: () => void; // Optional click handler for the card
};

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const { id, name, sprites } = pokemon;
  const { ref, isVisible } = useInView({ threshold: 1 });

  const typeBadges = pokemon.types.map((t) => {
    const typeName = t.type.name;
    const colorClass =
      typeColors[typeName] ||
      "bg-gray-200 text-black dark:bg-gray-600 dark:text-white";
    return (
      <span
        key={typeName}
        className={`text-sm px-2 py-1 rounded-3xl capitalize font-semibold ${colorClass}`}
      >
        {typeName}
      </span>
    );
  });

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="style group p-2 rounded-4xl text-center cursor-pointer min-h-[180px]"
    >
      {!isVisible ? (
        <div className="animate-pulse">
          <div className="mx-auto mb-4 bg-gray-300 dark:bg-gray-700 rounded-full w-[100px] h-[100px]" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto mb-4" />
          <div className="flex justify-center gap-2 flex-wrap">
            <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-3xl"></div>
            <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-3xl"></div>
          </div>
        </div>
      ) : (
        <>
          {sprites.front_default && (
            <Image
              src={sprites.front_default}
              alt={name}
              width={90}
              height={90}
              className="mx-auto group-hover:scale-125 duration-200 transition-transform"
              unoptimized
              loading="lazy"
            />
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400 font-extrabold">
            N°{id ? `${id}` : "Unknown ID"}
          </p>
          <h2 className="capitalize font-bold mb-2 text-lg">{name}</h2>
          <div className="mt-2 flex justify-center gap-2 flex-wrap">
            {typeBadges}
          </div>
        </>
      )}
    </div>
  );
}
