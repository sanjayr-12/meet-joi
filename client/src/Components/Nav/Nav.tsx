import { UserButton } from "@clerk/clerk-react"
import "./nav.css"
const Nav = () => {
  return (
      <div className="nav-container">
          <h2>Meet Joi</h2>
      <UserButton />
    </div>
  );
}

export default Nav