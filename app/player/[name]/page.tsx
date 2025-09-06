"use client";
import { PlayerSelector } from "@/app/PlayerSelector"
import { ChatBox } from "@/components/hrsh/ChatBox";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Player() {
  const params = useParams();
  const router = useRouter();
  const { name } = params;
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  return (
    <div className="px-40 py-5 flex flex-col h-screen justify-start items-center">
      {/* player selector */}
      <PlayerSelector
        unclickedPlaceholder="Search for more players"
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

      {/* container div */}
      <div className="flex flex-col w-full my-2 h-full">

        {/* profile picture and bio */}
        <div className="flex-1 flex w-full items-stretch justify-between gap-2">

          {/* picture */}
          <div className="shrink-0 flex-1 border flex-col rounded-lg shadow-xs">
          </div>


          {/* name and bio*/}
          <div className="flex-5 border p-4 rounded-xl shadow-xs">
            <h1 className="font-bold font-serif text-lg text-neutral-800"> Virat Kohli</h1>
            <p> something </p>
          </div>
        </div>

        {/* graphs and chatbot */}
        <div className="flex-3 flex justify-between gap-2 w-full  my-2">

          {/* graphs */}
          <div className="flex-2">
          </div>

          {/* chatbot*/}
          <div className="flex-1 border rounded-xl shadow-xs">
            <ChatBox
              name={name}
              inputPlaceholder="ask something about the player"
            />
          </div>

        </div>

      </div>

    </div>
  )
}
