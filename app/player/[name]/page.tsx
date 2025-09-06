"use client";
import { PlayerSelector } from "@/app/PlayerSelector"
import BatsmanCharts from "@/components/hrsh/BatsmanCharts";
import { ChatBox } from "@/components/hrsh/ChatBox";
import { useParams, useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function Player() {
  const params = useParams();
  const router = useRouter();
  const name = params.name as string;

  const { theme, setTheme } = useTheme();

  function getPlayerDescription(name: string) {
    switch (name) {
      case "ViratKohli":
        return `Virat Kohli is widely regarded as one of the premier batsmen in modern cricket, known for his consistency, adaptability, and aggressive approach across all formats of the game. Making his international debut for India in 2008, Kohli quickly established himself as a cornerstone of the Indian batting lineup. Over his career, he has accumulated thousands of runs in Tests, One Day Internationals, and T20 Internationals, consistently maintaining high batting averages and impressive strike rates.

Kohli has also been a transformative captain for India, leading the team to numerous victories, including historic series wins abroad. Renowned for his fitness, mental toughness, and ability to chase down targets under pressure, he has set multiple records for fastest centuries and high run aggregates. Beyond statistics, Kohli’s impact extends to inspiring a generation of cricketers with his work ethic and intensity on the field.

Key Highlights for Dashboard:
Formats: Test, ODI, T20I
Role: Top-order batsman, former captain
Strengths: Chasing under pressure, consistency, adaptability, aggressive batting style
Records: Fastest centuries, highest run aggregates, multiple Man of the Match awards
Career Span: 2008–present`
      case "SachinTendulkar":
        return `Sachin Tendulkar is widely regarded as one of the greatest cricketers in history, celebrated for his unparalleled consistency, technical mastery, and longevity across all formats of the game. Making his international debut for India in 1989 at the age of 16, Tendulkar became the backbone of India’s batting lineup for more than two decades. Renowned for his ability to adapt to any condition and counter all types of bowling, he amassed record-breaking runs in Tests, One Day Internationals, and T20 cricket.

Tendulkar’s career is highlighted by numerous milestones, including being the first player to score 100 international centuries, holding the record for the most runs in both Tests and ODIs, and earning multiple Man of the Match awards. Beyond his statistical achievements, he inspired generations of cricketers with his discipline, dedication, and sportsmanship, earning global recognition as a cricketing icon.

Key Highlights for Dashboard:
Formats: Test, ODI, T20I
Role: Top-order batsman
Strengths: Technical mastery, consistency, adaptability, ability to dominate bowling attacks
Records: 100 international centuries, highest run aggregates in Tests and ODIs, multiple Man of the Match awards
Career Span: 1989–2013`
      case "MSDhoni":
        return `MS Dhoni is one of the most iconic figures in Indian cricket, celebrated for his calm demeanor, sharp tactical mind, and finishing ability. Debuting in international cricket in 2004, Dhoni revolutionized limited-overs cricket with his unorthodox batting style and exceptional finishing skills. As captain, he led India to major victories, including the 2007 T20 World Cup, 2011 ODI World Cup, and multiple bilateral series wins abroad. Dhoni is also regarded as one of the greatest wicketkeepers, combining quick reflexes with intelligent game awareness. His leadership, composure under pressure, and consistency with the bat make him a benchmark for aspiring cricketers.

Key Highlights for Dashboard:
Formats: Test, ODI, T20I
Role: Wicketkeeper-batsman, former captain
Strengths: Finishing matches, calm leadership, adaptability, wicketkeeping
Records: Multiple ICC trophies, fastest 100 in ODIs (at the time), numerous Man of the Match awards
Career Span: 2004–2020 (international), ongoing in domestic/T20 leagues`
    }
  }

  return (
    <div className="px-40 py-5 flex flex-col h-screen justify-start items-center">

      <button
        className="absolute top-0 right-0 p-4 m-2 cursor-pointer hover:scale-105
      text-4xl "
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? "🌙" : "🌞"}
      </button>

      {/* player selector */}
      <div className="flex-1">
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
              label: "Sachin Tendulkar",
              value: "SachinTendulkar",
            },
            {
              label: "M.S. Dhoni",
              value: "MSDhoni",
            },
          ]}
        />
      </div>

      {/* container div */}
      <div className="flex flex-col w-full my-2 h-full">

        {/* profile picture and bio */}
        <div className="flex-3 max-h-2/5 flex w-full items-stretch justify-between gap-2">

          {/* picture */}
          <div className="shrink-0 flex-1 border p-1 flex-col rounded-lg shadow-xs">
            <img src={name == "ViratKohli" ? "/ViratKohli.webp" : (name == "MSDhoni" ? "/MSDhoni.jpg" : "/SachinTendulkar.webp")} className="w-full h-full object-cover" />
          </div>



          {/* name and bio*/}
          <div className="flex-5 border p-4 rounded-xl shadow-xs overflow-auto">
            <h1 className="font-bold font-serif text-2xl text-center text-neutral-800 dark:text-white"> {name}</h1>
            <pre className="whitespace-pre-wrap">
              {getPlayerDescription(name)}
            </pre>
          </div>
        </div>

        {/* graphs and chatbot */}
        <div className="flex-6 flex items-start justify-between gap-2 w-full  my-2">

          {/* graphs */}
          <div className="flex-2">
            <BatsmanCharts
              batsman={{
                name: name,
                stats: [1, 2, 3, 4, 5]
              }}
              theme="light"
            />
          </div>

          {/* chatbox*/}
          <div className="flex-1 border rounded-xl h-1/4 shadow-xs">
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
