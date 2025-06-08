"use client";
import { useEffect, useState } from "react";
import PokemonCard from "@/components/PokemonCard";
import UpButton from "@/components/UpButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

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
        }),
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
            className="style py-4 px-6 rounded-full w-full text-lg focus:outline-none"
          />
          {name && (
            <button
              type="button"
              onClick={() => setName("")}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-400 font-bold text-2xl hover:rotate-180 duration-300 hover:text-black dark:hover:text-white "
              aria-label="Clear"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
        </div>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 m-5 md:m-10">
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
        <UpButton />
      </section>
    </main>
  );
}
