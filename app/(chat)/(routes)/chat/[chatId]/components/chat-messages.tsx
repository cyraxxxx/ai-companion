"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { Companion } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "./chat-message";

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  companion: Companion;
}

export const ChatMessages = ({
  messages = [],
  isLoading,
  companion,
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);

  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false,
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={companion.src}
        role="system"
        content={`Bonjour, je suis ${companion.name}, ${companion.description}. Mon rôle est d'assurer le bon réroulement d'une partie, prendre des décisions sur des situations complexes et gérer les désaccords entre joueurs en appliquant les règles du R&A et de l'USGA avec précision. Comment puis-je vous aider? `}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          src={companion.src}
          content={message.content}
          role={message.role}
          isLoading={message.isLoading}
        />
      ))}
      <div ref={scrollRef} />
    </div>
  );
};
