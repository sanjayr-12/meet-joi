import { UserButton } from "@clerk/clerk-react";
import "./nav.css";
const Nav = () => {
  return (
    <div className="nav-container">
      <h2>Meet Joi</h2>
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default Nav;
