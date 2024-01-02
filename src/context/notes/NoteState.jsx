import NoteContext from "./NoteContext";
const NoteState = (props) => {
    const state = {
        name: " atharv",
        class: "TY A",
    };
    return (
        <NoteContext.Provider value={state}>
            {props.childern}
        </NoteContext.Provider>
    );
};

export default NoteState;
