// src/components/SearchBar.tsx

import { useState } from "react";

interface Props {
  onSearch: (city: string) => void;
}

function SearchBar({ onSearch }: Props) {

  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== "") {
      onSearch(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Rechercher une ville"
        className="flex-1 p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Rechercher
      </button>
    </form>
  );
}

export default SearchBar;
