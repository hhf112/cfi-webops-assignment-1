import { Input } from "@/components/ui/input"
import { useEffect, useRef } from "react";
import { useState } from "react"
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { useTheme } from "next-themes";

export interface TextBubble {
  type: number,
  content: string,
}

export interface ChatBoxProps {
  inputPlaceholder: string,
  name: string,
}

export function Alert({ message }: { message: string }) {
  const [mount, setMount] = useState(false);
  useEffect(() => setMount(true), []);
  return (
    <div className={`absolute px-3 py-1 text-lg  border-neutral-200 shadow-xl  right-0 bottom-0 rounded-lg bg-black text-white my-2 mx-2
      ${mount ? "translate-0 opacity-100" : "translate-y-3 opacity-0"} duration-100 delay-75 transition-all transform-all`}>
      {message}
    </div>
  )
}

export function ChatBox({ inputPlaceholder, name }: ChatBoxProps) {
  const {theme , setTheme} = useTheme();
  const promptRef = useRef<HTMLInputElement>(null)
  const [chat, setChat] = useState<TextBubble[]>([])
  const [alertMessage, setAlertMessage] = useState("");
  const [mount, setMount] = useState(false);
  useEffect(() => setMount(true), []);

  async function sendMessage() {
    if (promptRef.current != null) {
      if (promptRef.current?.value.length > 0) {
        const currentPrompt = promptRef.current.value;
        console.log(currentPrompt);
        setChat(prevChat => [...prevChat, { type: 0, content: currentPrompt }]);
        promptRef.current.value = " ";
        setAlertMessage("thinking ...");
        const resp = await fetch(`/api/${name}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: currentPrompt,
          }),
        });
        const text = await resp.json();
        console.log(text);
        recieveMessage(text.text);
        setAlertMessage("");
      }
    }
  }

  function recieveMessage(message: string) {
    setChat(prevChat => [...prevChat, { type: 1, content: message }]);
  }

  return (
    <div className={`flex flex-col w-full h-full p-2 justify-between gap-1 ${mount? "translate-0  opacity-100" : "opacity-0 translate-y-2"} transition-all transform-all delay-100 duration-150`}>
      {alertMessage.length > 0 && <Alert message={alertMessage} />}



      {/* chat */}
      <div className="flex-10 border rounded-lg p-2 flex flex-col justify-start gap-0.5 overflow-auto">
        {chat.map((bubble, index) => {
          return (
            bubble.type === 0 ? (
              <div className="flex justify-end " key={index}>
                <p className="p-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 dark:text-white"> {bubble.content} </p>
              </div>
            ) : (
              <div className="flex justify-start " key={index}>
                <p className="p-2 dark:text-white"> {bubble.content} </p>
              </div>
            )
          )
        })}
      </div>

      {/* input */}
      <div className="flex-1 flex justify-between items-center gap-2 p-1">
        <Input type="text" placeholder={inputPlaceholder}
          className="h-full flex-10"
          ref={promptRef} />

        <div
          className="h-ful flex-1 w-4 hover:bg-neutral-200 rounded-lg border border-neutral-300 p-4
        cursor-pointer duration-75 delay-75 bg-white hover:-translate-y-1 hover:translate-x-1 transition-all transform-all">
          <img src={theme == "dark" ? "/send-dark.png" : "/send.png"}
            className="h-full w-full object-contain "
            onClick={() => sendMessage()} />
        </div>

      </div>
    </div>

  )
}

