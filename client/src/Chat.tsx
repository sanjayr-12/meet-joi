import { UserButton } from "@clerk/clerk-react";
import axios from "axios";
const Chat = () => {
  const handleClick = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/chat", {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Chat
      <UserButton />
      <button onClick={handleClick}>request</button>
    </div>
  );
};

export default Chat;
