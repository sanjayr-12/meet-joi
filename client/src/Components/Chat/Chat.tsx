import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import "./chat.css";
import Display from "../Display/Display";
import useStore from "../../store/zustand.ts";

const Chat = () => {
  const [message, setMessage] = useState([]);
  // const [render, setRender] = useState(0);
  const [disable, setDisable] = useState(false);
  const [input, setInput] = useState("");
  const render = useStore((state) => state.render);
  const setRender = useStore((state) => state.setRender);
  useEffect(() => {
    async function user() {
      try {
        await axios.post("/api/user/login", {}, { withCredentials: true });
      } catch (error) {
        console.log(error);
      }
    }
    user();
  }, []);

  useEffect(() => {
    async function getAll() {
      try {
        const response = await axios.get("/api/chat", {
          withCredentials: true,
        });
        console.log(response.data.messages);
        setMessage(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    }
    getAll();
  }, [render]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.target as HTMLFormElement);
    const prompt = formdata.get("prompt");
    if (typeof prompt !== "string" || !prompt.trim()) {
      return;
    }
    try {
      setDisable(true);
      const response = await axios.post(
        "/api/chat/post",
        { prompt },
        { withCredentials: true }
      );
      setRender()
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setDisable(false);
      setInput("");
    }
    console.log(disable);
  };

  return (
    <div className="chat-container">
      <Nav />

      <div className="message-container">
        <Display messages={message} />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="prompt"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          required
        />
        <br />
        <input
          type="submit"
          value={disable ? "..." : "send"}
          disabled={disable}
        />
      </form>
    </div>
  );
};

export default Chat;
