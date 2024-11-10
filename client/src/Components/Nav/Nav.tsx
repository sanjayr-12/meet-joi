import { UserButton } from "@clerk/clerk-react";
import "./nav.css";
import axios from "axios";
import useStore from "../../store/zustand";
import { useState } from "react";
const Nav = () => {
  const setRender = useStore((state) => state.setRender);
  const [del, setDel] = useState(false);
  const handleDelete = async () => {
    const confrim = prompt(
      `To delete this chat type DELETE, This action is irreversible. No Spaces!`
    );
    if (confrim === "DELETE") {
      try {
        setDel(true);
        const response = await axios.delete("/api/chat/delete");
        console.log(response);
        setRender();
      } catch (error) {
        console.log(error);
      } finally {
        setDel(false);
      }
    } else {
      alert("Incorrect Code!!!");
    }
  };
  return (
    <div className="nav-container">
      <h2>Meet Joi</h2>
      <button className="delete-btn" onClick={handleDelete} disabled={del}>
        {del ? "Deleting..." : "Delete Chats"}
      </button>
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default Nav;
