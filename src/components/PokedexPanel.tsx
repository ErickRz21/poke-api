// components/PokedexPanel.tsx
import type { Pokemon } from "@/types/pokemon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import typeColors from "@/utils/typeColors";
import { motion } from "framer-motion";

type PokedexPanelProps = {
  pokemon: Pokemon;
  onClose: () => void;
  show: boolean;
};

const modalVariants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { type: "tween", duration: 0.2 },
  },
  exit: {
    y: "100%",
    transition: { type: "tween", duration: 0.2 },
  },
};

export default function PokedexPanel({ pokemon, onClose }: PokedexPanelProps) {
  return (
    <motion.section
      key="pokedex-panel"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalVariants}
      className="fixed inset-0 sm:right-0 sm:inset-y-0 sm:w-[350px] w-full h-full bg-background/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-lg z-50 duration-200 overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-4xl text-neutral-300/90 dark:text-neutral-700/90 hover:text-red-500 duration-200 cursor-pointer"
        aria-label="Close"
      >
        <FontAwesomeIcon icon={faCircleXmark} />
      </button>

      <div className="p-5 py-5 lg:py-10 text-gray-800 dark:text-white space-y-3">
        {/* Poke Info */}
        <section className="flex flex-col items-center space-y-2">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`}
            alt={pokemon.name}
            width={128}
            height={128}
            className="w-32 h-32 md:w-52 md:h-52 object-contain image-render-pixelated"
            unoptimized
          />
          <h2 className="text-3xl font-bold capitalize">{pokemon.name}</h2>
          <div className="flex flex-wrap justify-center gap-1">
            {pokemon.types.map((t) => {
              const typeName = t.type.name;
              const colorClass =
                typeColors[typeName] ||
                "bg-gray-200 text-black dark:bg-gray-600 dark:text-white";
              return (
                <span key={typeName} className={`badge ${colorClass}`}>
                  {typeName}
                </span>
              );
            })}
          </div>
          {/* Description */}
          <p className="text-center text-gray-600 dark:text-neutral-200 text-sm md:text-base px-0">
            {pokemon.description ||
              "This is a placeholder description for the Pokémon."}
          </p>
        </section>

        {/* Info Box */}
        <div className="bg-neutral-300/90 dark:bg-background/90 p-5 rounded-4xl text-sm space-y-2">
          <section className="grid grid-cols-1">
            <div className="grid grid-cols-2 gap-1 text-center">
              <div>
                <strong>Height</strong>
                <p className="style attribute mt-2">{pokemon.height / 10} m</p>
              </div>
              <div>
                <strong>Weight</strong>
                <p className="style attribute mt-2">{pokemon.weight / 10} kg</p>
              </div>
            </div>

            <div className="flex justify-center mt-2">
              <strong>Ability</strong>
            </div>
            <div className="grid grid-cols-2 gap-1 mt-2 text-center">
              {pokemon.abilities.map((a) => (
                <div key={a.ability.name}>
                  <p className="style attribute">{a.ability.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section>
            <strong className="block text-center">Stats</strong>
            <ul className="space-y-3">
              {pokemon.stats.map((s) => {
                const mainType = pokemon.types[0].type.name;
                const barClass = typeColors[mainType] || "bg-black";

                return (
                  <li key={s.stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="capitalize font-medium">
                        {s.stat.name}
                      </span>
                      <span className="font-bold">{s.base_stat}</span>
                    </div>
                    <div className="w-full bg-white dark:bg-neutral-700 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full ${barClass}`}
                        style={{ width: `${(s.base_stat / 180) * 100}%` }}
                      ></div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </motion.section>
  );
}
