import { useState, useEffect } from "react";
import type { Pokemon } from "@/types/pokemon";

export function usePokemons(limit = 1000) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        if (!res.ok) throw new Error("Failed to fetch Pokémon list");

        const data = await res.json();
        const results = data.results;

        const detailedData = await Promise.all(
          results.map(async (poke: { name: string; url: string }) => {
            const res = await fetch(poke.url);
            if (!res.ok) throw new Error(`Failed to fetch ${poke.name}`);
            return await res.json();
          }),
        );

        setPokemons(detailedData);
        } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      }
    };

    fetchPokemons();
  }, [limit]);

  return { pokemons, loading, error };
}
