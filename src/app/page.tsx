"use client";
import { useEffect, useState } from "react";
import PokemonCard from "@/components/PokemonCard";

type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};

export default function SearchPokemon() {
  const [name, setName] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchInitialPokemons = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
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

  const filteredPokemons = name
    ? pokemons.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()))
    : pokemons;

  return (
    <main>
      <section className="m-5 md:m-10">
        <div className="relative w-full max-w-4xl">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search Pokémon"
            className="py-4 px-6 rounded-full w-full shadow-inner dark:shadow-neutral-700 bg-white dark:bg-neutral-900 text-lg text-black dark:text-white"
          />
          {name && (
            <button
              type="button"
              onClick={() => setName("")}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none font-bold text-2xl hover:text-white duration-200"
              aria-label="Clear"
            >
              x
            </button>
          )}
        </div>
      </section>

      <section
        className={`grid gap-4 m-5 md:m-10 ${
          filteredPokemons.length === 1
            ? "grid-cols-1"
            : filteredPokemons.length === 2
            ? "grid-cols-2"
            : filteredPokemons.length === 3
            ? "grid-cols-3"
            : filteredPokemons.length === 4
            ? "grid-cols-4"
            : "grid-cols-5"
        }`}
      >
        {filteredPokemons.map((pokemon) => (
          <PokemonCard
            id={pokemon.id}
            key={pokemon.name}
            name={pokemon.name}
            sprites={pokemon.sprites}
            types={pokemon.types}
          />
        ))}
      </section>
      {/* UpButton */}
      <section className="fixed bottom-5 right-5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-indigo-500 text-white p-5 text-lg rounded-3xl shadow-lg hover:bg-indigo-600 duration-200"
          aria-label="Scroll to top"
        >
          Top
        </button>
      </section>
    </main>
  );
}
