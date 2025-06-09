// components/PokedexPanel.tsx
import type { Pokemon } from "@/types/pokemon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import typeColors from "@/utils/typeColors";

type PokedexPanelProps = {
  pokemon: Pokemon;
  onClose: () => void;
};

export default function PokedexPanel({ pokemon, onClose }: PokedexPanelProps) {
  return (
    <section className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white dark:bg-zinc-900 shadow-lg z-50 transition-transform duration-300 ease-in-out">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl text-neutral-600 hover:text-red-500"
        aria-label="Close"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <div className="p-6 mt-10 text-gray-800 dark:text-white space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={128}
            height={128}
            className="w-52 h-52 object-contain"
            unoptimized
          />
          <span className="text-gray-500 dark:text-gray-400 font-semibold text-sm">
            N°{pokemon.id}
          </span>
          <h2 className="text-3xl font-bold capitalize">{pokemon.name}</h2>
          <div className="flex items-center">
            {pokemon.types.map((t) => {
              const typeName = t.type.name;
              const colorClass =
                typeColors[typeName] ||
                "bg-gray-200 text-black dark:bg-gray-600 dark:text-white";
              return (
                <span
                  key={typeName}
                  className={`text-sm px-2 py-2 rounded-lg capitalize font-semibold ${colorClass}`}
                >
                  {typeName}
                </span>
              );
            })}
          </div>
        </div>
        <div className="style space-y-4 p-4 rounded-3xl text-sm">
          <div className="grid grid-cols-1">
            <div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <strong>Height</strong>
                  <p className="style attribute mt-2">
                    {pokemon.height / 10} m
                  </p>
                </div>
                <div>
                  <strong>Weight</strong>
                  <p className="style attribute mt-2">
                    {pokemon.weight / 10} kg
                  </p>
                </div>
              </div>

              {/* Only one centered "Ability" title */}
              <div className="flex justify-center mt-4">
                <strong>Ability</strong>
              </div>

              {/* Grid for abilities */}
              <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-center">
                {pokemon.abilities.map((a) => (
                  <div key={a.ability.name}>
                    <p className="style attribute">{a.ability.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section className="mt-6">
            <strong className="block text-center">Stats</strong>
            <ul className="space-y-3">
              {pokemon.stats.map((s) => (
                <li key={s.stat.name}>
                  <div className="flex justify-between mb-1">
                    <span className="capitalize font-medium">
                      {s.stat.name}
                    </span>
                    <span className="font-bold">{s.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-neutral-800 rounded-full h-1">
                    <div
                      className="bg-black dark:bg-white h-1 rounded-full"
                      style={{ width: `${(s.base_stat / 150) * 100}%` }} // Adjust 150 if needed
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
