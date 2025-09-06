import { PlayerSelector } from "./PlayerSelector";
import type { PlayerSelectorProps } from "./PlayerSelector";

export default function Page() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
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
