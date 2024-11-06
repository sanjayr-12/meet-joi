import { UserButton } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";
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

  useEffect(() => {
    async function user() {
      try {
        const addUser = await axios.post(
          "/api/user/login",
          {},
          { withCredentials: true }
        );
        console.log(addUser);
      } catch (error) {
        console.log(error);
      }
    }
    user();
  }, []);

  return (
    <div>
      Chat
      <UserButton />
      <button onClick={handleClick}>request</button>
    </div>
  );
};

export default Chat;
