"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Pokemon = {
  types: any;
  name: string;
  sprites: {
    front_default: string;
  };
};

export default function SearchPokemon() {
  const [name, setName] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const typeColors: { [key: string]: string } = {
    normal: "bg-gray-200 text-black dark:bg-gray-600 dark:text-white",
    fire: "bg-red-300 text-black dark:bg-red-600 dark:text-white",
    water: "bg-blue-300 text-black dark:bg-blue-600 dark:text-white",
    electric: "bg-yellow-300 text-black dark:bg-yellow-500 dark:text-white",
    grass: "bg-green-300 text-black dark:bg-green-600 dark:text-white",
    ice: "bg-cyan-200 text-black dark:bg-cyan-400 dark:text-white",
    fighting: "bg-orange-300 text-black dark:bg-orange-700 dark:text-white",
    poison: "bg-purple-300 text-black dark:bg-purple-600 dark:text-white",
    ground: "bg-yellow-400 text-black dark:bg-yellow-700 dark:text-white",
    flying: "bg-sky-200 text-black dark:bg-sky-500 dark:text-white",
    psychic: "bg-pink-300 text-black dark:bg-pink-600 dark:text-white",
    bug: "bg-lime-300 text-black dark:bg-lime-600 dark:text-white",
    rock: "bg-yellow-500 text-black dark:bg-yellow-800 dark:text-white",
    ghost: "bg-indigo-300 text-black dark:bg-indigo-700 dark:text-white",
    dragon: "bg-indigo-400 text-black dark:bg-indigo-600 dark:text-white",
    dark: "bg-gray-500 text-black dark:bg-gray-900 dark:text-white",
    steel: "bg-gray-300 text-black dark:bg-gray-500 dark:text-white",
    fairy: "bg-pink-200 text-black dark:bg-pink-400 dark:text-white",
  };

  // Fetch initial 151 Pokémon
  useEffect(() => {
    const fetchInitialPokemons = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await res.json();
      const results = data.results;

      const detailedData = await Promise.all(
        results.map(async (poke: { name: string; url: string }) => {
          const res = await fetch(poke.url);
          return await res.json();
        })
      );

      setPokemons(detailedData);
    };

    fetchInitialPokemons();
  }, []);

  // Filtered list based on input
  const filteredPokemons = name
    ? pokemons.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()))
    : pokemons;

  return (
    <main>
      <div className="border-gray-200 m-10 flex gap-0">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search Pokémon"
          className="py-4 px-6 rounded-full w-full max-w-4xl shadow-inner dark:shadow-neutral-700 bg-white dark:bg-neutral-900 
          text-black dark:text-white "
        />
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 m-10">
        {filteredPokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            className="p-4 rounded-4xl shadow-inner dark:shadow-neutral-700 text-center bg-white dark:bg-neutral-900 dark:text-white 
            hover:shadow-neutral-400 transition-shadow duration-200"
          >
            {pokemon.sprites.front_default && (
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={100}
                height={100}
                className="mx-auto mb-0"
              />
            )}

            <h2 className="capitalize font-bold mb-2">{pokemon.name}</h2>

            <div className="mt-2 flex justify-center gap-2 flex-wrap">
              {pokemon.types.map((t: any) => {
                const typeName = t.type.name;
                const colorClass =
                  typeColors[typeName] ||
                  "bg-gray-200 text-black dark:bg-gray-600 dark:text-white";
                return (
                  <span
                    key={typeName}
                    className={`flex items-center text-sm px-2 py-1 rounded-3xl capitalize font-medium ${colorClass}`}
                  >
                    {typeName}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
