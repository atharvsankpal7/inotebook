import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
const About = () => {
  let noteState = useContext(NoteContext)
    return <div>This is {noteState.name}</div>;
};

export default About;
