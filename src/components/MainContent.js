import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./MainContent.css";
import {useNavigate} from "react-router-dom";

const MainContent = ({notes,onDeleteNote,activeNote, onUpdateNote}) => {
  const[content,setContent] = useState(activeNote?activeNote.body:"");
  const[title,titleChange] = useState(activeNote?activeNote.title:"");
  const [noteTime,setNoteTime] = useState(activeNote?activeNote.noteTime:"");
  if(!activeNote){
    return <div className="no-active-note">Select a note or create a new note</div>
  };
  const saveContent=(editor)=>{
    setContent(editor);
  };
  let pretitle=activeNote.title;
  let prebody=activeNote.body;
  let prenoteTime=activeNote.noteTime;
  let id = activeNote.id;
  return (
    <div className="MainContent">
      <div className="MCTitle">
        <div className="header_title">
          <input type="text" className="TitleRead1" placeholder="Untitled" defaultValue={pretitle} onChange={(e)=>titleChange(e.target.value)} />
          
          
        </div>
        <div className="MCTitle2">
        {/*<button className="Save" onClick={()=>onEditField("body",content)} >Save</button>*/}
        <SaveButton updatedNote={onUpdateNote} activeNote= {activeNote} title={title} noteTime={noteTime} content={content}/>
        <DeleteButton onDeleteNote={onDeleteNote} id={activeNote.id}/>  
          
        </div>
      </div>
      <input className="time" type ="datetime-local" defaultValue={prenoteTime} onChange={(e)=>setNoteTime(formatDate(e.target.value))}></input>
      <ReactQuill
        type="text"
        placeholder="Start writing here..."
        modules={MainContent.modules}
        value={content}
        formats={MainContent.formats}
        onChange={saveContent}
        
        autoFocus
        
      />
    </div>

  );
};
MainContent.modules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "italic", "underline"],
    ["link"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};
MainContent.formats = [
  "size",
  "bold",
  "italic",
  "underline",
  "link",
  "list",
  "code-block",
];
export default MainContent;
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
function SaveButton({updatedNote, activeNote,title,noteTime,content}){
  const navigate=useNavigate();

  const Save=(updatedNote, activeNote,title,noteTime,content)=>{
    if (title==="")
    {
      title="Untitled";
    }
    updatedNote({
      ...activeNote,
      ["title"]:title,
      ["body"]:content,
      ["noteTime"]:noteTime,

    });}
    const handleEditClick = (updatedNote, activeNote,title,noteTime,content)=>{
      Save(updatedNote, activeNote,title,noteTime,content)
      navigate(-1);
    };
    return(
        <button className="save" onClick={()=>handleEditClick(updatedNote, activeNote,title,noteTime,content)}>Save</button>
    );

}
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const formatDate = (when) => {
  const formatted = new Date(when).toLocaleString("en-US", options);
  if (formatted === "Invalid Date") {
      return "";
  }
  return formatted;
};