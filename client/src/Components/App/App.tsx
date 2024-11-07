import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import Chat from "../Chat/Chat";
import "./app.css";

const App = () => {
  const { user } = useUser();
  console.log(user);

  return (
    <div className="main-container">
      <SignedOut>
        <div className="sign-btn">
          <h2>Sign in to Meet Joi</h2>
          <SignInButton />
        </div>
      </SignedOut>
      <SignedIn>
        <Chat />
      </SignedIn>
    </div>
  );
};

export default App;
