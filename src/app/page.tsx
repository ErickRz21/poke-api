"use client";
import { useState } from "react";
import PokemonCard from "@/components/PokemonCard";
import UpButton from "@/components/UpButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { usePokemons } from "@/hooks/usePokemons";
import type { Pokemon } from "@/types/pokemon";
import PokedexPanel from "@/components/PokedexPanel";
import { AnimatePresence } from "framer-motion";

export default function SearchPokemon() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [name, setName] = useState("");
  const { pokemons, loading, error } = usePokemons(1000);

  // Filter pokemons based on the search name
  const filteredPokemons = name
    ? pokemons.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()))
    : pokemons;

  console.log(selectedPokemon);
  return (
    <main>
      <section className="m-5 md:m-10">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search Pokémon"
            className="style py-4 px-6 rounded-full w-full text-lg focus:outline-none"
          />
          {name && (
            <button
              type="button"
              onClick={() => setName("")}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-400 font-bold text-2xl hover:rotate-180 duration-300 hover:text-black dark:hover:text-white cursor-pointer"
              aria-label="Clear"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
        </div>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 m-5 md:m-10">
        {loading && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <img
              src="/icons/pokeball.png" // can be local file or external URL
              alt="Loading..."
              className="w-30 h-30 animate-spin"
            />
          </div>
        )}
        {error && <p>Error: {error}</p>}
        {!loading &&
          !error &&
          filteredPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              onClick={() => setSelectedPokemon(pokemon)}
            />
          ))}
      </section>

      {/* UpButton */}
      <section className="fixed bottom-5 right-5">
        <UpButton />
      </section>
      <AnimatePresence>
        {selectedPokemon && (
          <PokedexPanel
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
            show={!!selectedPokemon}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
