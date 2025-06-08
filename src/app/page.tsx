import Image from "next/image";
import "./globals.css"

// app/pokemon/page.tsx

async function getPokemon() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}"
  );
  if (!res.ok) throw new Error('Failed to fetch Pokémon');
  return res.json();
}

export default function Home() {
  return (
    <main>
      <div className="border-gray-200 m-10">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="w-full px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <Image
                src={`/pokemon/${index + 1}.png`}
                alt={`Pokémon ${index + 1}`}
                width={100}
                height={100}
              />
              <h3 className="mt-2 text-lg font-semibold">Pokémon {index + 1}</h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
