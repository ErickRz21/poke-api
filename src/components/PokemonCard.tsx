import Image from "next/image";
import typeColors from "@/utils/typeColors";

type PokemonCardProps = {
  name: string;
  sprites: { front_default: string };
  types: any[];
};

export default function PokemonCard({
  name,
  sprites,
  types,
}: PokemonCardProps) {
  return (
    <div
      className="p-4 rounded-4xl shadow-inner dark:shadow-neutral-700 text-center bg-white dark:bg-neutral-900 dark:text-white 
      hover:shadow-neutral-400 transition-shadow duration-200 cursor-pointer"
    >
      {sprites.front_default && (
        <Image
          src={sprites.front_default}
          alt={name}
          width={100}
          height={100}
          className="mx-auto mb-0"
        />
      )}

      <h2 className="capitalize font-bold mb-2 text-lg">{name}</h2>

      <div className="mt-2 flex justify-center gap-2 flex-wrap">
        {types.map((t) => {
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
        })}
      </div>
    </div>
  );
}
