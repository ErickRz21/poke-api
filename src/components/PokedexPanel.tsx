// components/PokedexPanel.tsx
import type { Pokemon } from "@/types/pokemon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type PokedexPanelProps = {
  pokemon: Pokemon;
  onClose: () => void;
};

export default function PokedexPanel({ pokemon, onClose }: PokedexPanelProps) {
  return (
    <div className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white dark:bg-zinc-900 shadow-lg z-50 transition-transform duration-300 ease-in-out">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl text-neutral-600 hover:text-red-500"
        aria-label="Close"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <div className="p-6 mt-10">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32 mx-auto"
        />
        <h2 className="text-center text-2xl font-bold capitalize mt-4">
          {pokemon.name}
        </h2>
        <div className="mt-4 text-center">
          <p>
            <strong>ID:</strong> {pokemon.id}
          </p>
          <p>
            <strong>Type:</strong>{" "}
            {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>
          <p>
            <strong>Height:</strong> {pokemon.height / 10} m
          </p>
          <p>
            <strong>Weight:</strong> {pokemon.weight / 10} kg
          </p>
          <p>
            <strong>Base Experience:</strong> {pokemon.base_experience}
          </p>
          <p>
            <strong>Abilities:</strong>{" "}
            {pokemon.abilities.map((a) => a.ability.name).join(", ")}
          </p>
          <strong>Stats:</strong>
          <ul className="list-disc list-inside">
            {pokemon.stats.map((s) => (
              <li key={s.stat.name}>
                {s.stat.name}: {s.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
