import { useEffect, useRef } from "react";
import { chat } from "../../types/messages";
import "./display.css";

type PropType = {
  messages: chat[];
};

const Display = ({ messages }: PropType) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="display-container">
      {messages.map((chat) => (
        <div className="child-display-container" key={chat._id}>
          <p className="user">{chat.messages.user}</p>
          <p className="ai">{chat.messages.ai}</p>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default Display;
