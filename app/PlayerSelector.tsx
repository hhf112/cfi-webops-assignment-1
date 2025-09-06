/* eslint-disable react/no-unescaped-entities */
"use client";
import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export interface PlayerSelectorProps {
  players: { label: string, value: string }[],
  unclickedPlaceholder: string,
  clickedPlaceholder: string,
  notFoundPlaceholder: string,
}

export function PlayerSelector({
  players,
  unclickedPlaceholder,
  clickedPlaceholder,
  notFoundPlaceholder,
}: PlayerSelectorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);
  // useEffect(() => console.log(theme), [theme]);

  return (
    <div className={`${mount ? "translate-0  opacity-100" : "opacity-0 -translate-y-2"} transition-all transform-all delay-100 duration-150`}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            role="combobox"
            aria-expanded={open}
            className="w-[500px] h-[50px] justify-between text-sm text-neutral-800 dark:text-neutral-100 cursor-pointer"

          >
            {value
              ? players.find((player) => player.value === value)?.label
              : unclickedPlaceholder}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] p-0">
          <Command>
            <CommandInput placeholder={clickedPlaceholder} />
            <CommandList>
              <CommandEmpty>{"This player doesn't exist in our database yet :"}(</CommandEmpty>
              <CommandGroup>
                {players.map((player) => (
                  <CommandItem
                    key={player.value}
                    value={player.value}
                    onSelect={(currentValue) => {
                      setOpen(false)
                      router.push(`/player/${currentValue}`)
                    }}
                    className="cursor-pointer"
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === player.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {player.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
