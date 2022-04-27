import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";


function Note(props) {
  function handleClick() {
    props.onDelete(props.idDB,props.idPage);
    console.log("g");
  }

  function changeText(){

    console.log("hola");
  }
  return (
    <div className="note">
      <h1 onClick={changeText} >{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
