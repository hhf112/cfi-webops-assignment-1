"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { PlayerSelector } from "./PlayerSelector";
import type { PlayerSelectorProps } from "./PlayerSelector";

export default function Page() {
  const router = useRouter();
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

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
            label: "Varun  Dhawan",
            value: "VarunDhawan",
          },
          {
            label: "M.S. Dhoni",
            value: "MSDhoni",
          },
        ]}
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={setValue}
      />
      <div className="absolute bottom-0 my-1 font-mono text-xs text-neutral-700">
      Made by Harsh Tandekar CH23B084

      </div>
    </div>
  )
}
