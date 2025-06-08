import Image from "next/image";
import typeColors from "@/utils/typeColors";
import useInView from "@/hooks/useInView";

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
  const { ref, isVisible } = useInView({ threshold: 0.5 });

  const typeBadges = types.map((t) => {
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
      className="p-4 rounded-4xl shadow-inner dark:shadow-neutral-700 text-center bg-white dark:bg-neutral-900 dark:text-white 
      hover:shadow-neutral-400 transition-shadow duration-200 cursor-pointer min-h-[180px]"
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
              width={100}
              height={100}
              className="mx-auto mb-0"
            />
          )}
          <h2 className="capitalize font-bold mb-2 text-lg">{name}</h2>
          <div className="mt-2 flex justify-center gap-2 flex-wrap">
            {typeBadges}
          </div>
        </>
      )}
    </div>
  );
}
