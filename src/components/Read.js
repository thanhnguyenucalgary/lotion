import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./MainContent.css";
import {useNavigate} from "react-router-dom";

const Read = ({notes,onDeleteNote,activeNote, onUpdateNote}) => {

  if(!activeNote){
    return <div className="no-active-note">Select a note or create a new note</div>
  };

  return (
    <div className="MainContent">
      <div className="MCTitle">
        <div className="header_title">
          <div className="TitleRead">{activeNote.title}</div>
          
        </div>
        <div className="MCTitle2">
        <EditButton/>
        <DeleteButton onDeleteNote={onDeleteNote} id={activeNote.id}/>          
        </div>
      </div>
      <div className="TimeRead"><small>{activeNote.noteTime}</small></div>
      <div className= "ReadContent"dangerouslySetInnerHTML={{__html:activeNote.body}}></div>
    </div>

  );
};
Read.modules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "italic", "underline"],
    ["link"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};
Read.formats = [
  "size",
  "bold",
  "italic",
  "underline",
  "link",
  "list",
  "code-block",
];
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
export default Read;
function EditButton(){
  const navigate=useNavigate();

  const Edit=()=>{
       navigate("./edit");
    }
    return(
        <button className="Edit" onClick={Edit}>Edit</button>
    );

}

function DeleteButton({onDeleteNote,id}){
  const navigate=useNavigate();

  const Delete=(onDeleteNote,id)=>{
      onDeleteNote(id)
      navigate("../notes");
    }
    return(
        <button className="Delete" onClick={()=>Delete(onDeleteNote,id)}>Delete</button>
    );

}