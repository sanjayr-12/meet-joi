import { UserButton } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
const Chat = () => {
  const [message, setMessage] = useState(null)
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.target as HTMLFormElement);
    const prompt = formdata.get("prompt");
    try {
      const response = await axios.post(
        "/api/chat/",
        { prompt },
        { withCredentials: true }
      );
      setMessage(response.data.response)
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <UserButton />
      <form onSubmit={handleSubmit}>
        <input type="text" name="prompt" />
        <br />
        <input type="submit" />
      </form>
      {message}
    </div>
  );
};

export default Chat;
