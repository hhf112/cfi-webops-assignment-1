"use client";
import { PlayerSelector } from "./PlayerSelector";
import type { PlayerSelectorProps } from "./PlayerSelector";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex flex-col h-screen justify-center items-center">

      <button 
      className="absolute top-0 right-0 p-4 m-2
      text-4xl ">
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
