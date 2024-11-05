import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import Chat from "./Chat";
import axios from "axios";

const App = () => {
  const { user } = useUser();
  console.log(user);

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
      <SignedOut>
        <SignInButton />
        <button onClick={handleClick}>check</button>
      </SignedOut>
      <SignedIn>
        <Chat />
      </SignedIn>
    </div>
  );
};

export default App;
