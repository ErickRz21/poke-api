"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
  };
};

export default function SearchPokemon() {
  const [name, setName] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  // 🔄 Fetch first 151 Pokémon on mount
  useEffect(() => {
    const fetchInitialPokemons = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await res.json();
      const results = data.results; // array of { name, url }

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

  // 🔍 Search for a specific Pokémon
  const handleSearch = async () => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      if (!res.ok) throw new Error("Pokémon not found");
      const data = await res.json();

      const alreadyExists = pokemons.some((p) => p.name === data.name);
      if (!alreadyExists) {
        setPokemons((prev) => [data, ...prev]);
      } else {
        alert("Pokémon already shown");
      }

      setName("");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <main>
      <div className="border-gray-200 m-10 flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Pokémon name"
          className="border p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 m-10">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            className="border p-4 rounded shadow text-center"
          >
            <h2 className="capitalize font-bold mb-2">{pokemon.name}</h2>
            {pokemon.sprites.front_default && (
              <Image
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={100}
                height={100}
              />
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
