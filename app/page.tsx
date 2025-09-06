"use client";
import { useEffect } from "react";
import { PlayerSelector } from "./PlayerSelector";
import type { PlayerSelectorProps } from "./PlayerSelector";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Page() {
  const [mount, setMount] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => console.log(theme), [theme]);
  if (!mount) return null;

  return (
    <div className="flex flex-col h-screen justify-center items-center">

      <button
        className="absolute top-0 right-0 p-4 m-2 cursor-pointer hover:scale-105
      text-4xl "
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? "🌙" : "🌞"}
      </button>

      <PlayerSelector
        unclickedPlaceholder="Get stats on your favourite player"
        notFoundPlaceholder="No player found"
        clickedPlaceholder="search by name"
        players={[
          {
            label: "Virat Kohli",
            value: "ViratKohli",
          },
          {
            label: "Sachin Tendulkar",
            value: "SachinTendulkar",
          },
          {
            label: "M.S. Dhoni",
            value: "MSDhoni",
          },
        ]}
      />

      <div className="absolute bottom-0 my-1 font-mono text-xs text-neutral-700">
        Made by Harsh Tandekar CH23B084
      </div>
    </div>
  )
}
