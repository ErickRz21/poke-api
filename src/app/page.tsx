"use client";
import { useEffect, useState } from "react";
import PokemonCard from "@/components/PokemonCard";

type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
  };
  types: any[];
};

export default function SearchPokemon() {
  const [name, setName] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

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
          className="py-4 px-6 rounded-full w-full max-w-4xl shadow-inner dark:shadow-neutral-700 bg-white dark:bg-neutral-900 text-lg text-black dark:text-white"
        />
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 m-10">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            sprites={pokemon.sprites}
            types={pokemon.types}
          />
        ))}
      </section>
    </main>
  );
}
