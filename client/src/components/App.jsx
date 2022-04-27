import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import  Axios  from "axios";



function App() {
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    
    Axios.get("http://localhost:3001/").then(response=>{
      setNotes(response.data);
      console.log(response);
    })
  },[])

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(idDB,idPage) {
   
    console.log(idDB);
    console.log(idPage);

    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== idPage;
      });
    });
    Axios.delete(`http://localhost:3001/delete/${idDB}`);
   
  }


  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            idDB={noteItem._id}
            idPage = {index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
