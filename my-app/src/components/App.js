import React, {useEffect,useState,Component}from "react";
import "./App.css";
import MainContent from "./MainContent.js";
import Read from "./Read.js";
import SideBar from "./SideBar.js";
import uuid from "react-uuid";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function App(mode){
  const num=useParams();
  
  const nav = useNavigate();
  //const[state, setState] =useState({
  //})

  //toggleShowMe(){
    //this.setState({showMe: !this.state.showMe})
//};
const[sideBar,setSideBar] = useState(true);
const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
const[activeNote,setActiveNote] = useState(false);
useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes));},[notes]);
const toggleShowMe = () => {
  setSideBar(!sideBar);}

  //const [notes, setNotes] = useState([]);
  //const[activeNote,setActiveNote] = useState(false);
  
  const idSimplified=()=>{
    let idSimplified=1;
    notes.map((note)=>{
      note.index=idSimplified;
      idSimplified+=1;
    });
  }
  idSimplified();
  if(!activeNote){
    notes.map((note)=>{
      if(note.index===num){
        setActiveNote(note.id);
      }
    });
  }
  const onAddNote = () => {
    const newNote = {
      index:1,
      id:uuid(),
      title: "Untitled",
      body:"",
      noteTime: ""//formatDate(Date.now()),
    }
    
    //notes.map((note)=>{
      //note.index +=1;});
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
    let x=1;
    for  (let i=0;i<notes.length;i++){
      if(x<notes[i].index){
        x=notes[i].index+1;
    }
  }
    newNote.index=x;
    console.log(newNote.index);
    nav(`/notes/`+newNote.index+"/edit");
    idSimplified();

  }
  const onDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  }
  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if(note.id === updatedNote.id){
        return updatedNote;
      }
      return note;
    
    });
    setNotes(updatedNotesArray);
  }
  const getActiveNote = () => {return notes.find(({id}) => id === activeNote)};
  if (mode.mode === "NotSelecting"){
  return (
    <div className="ui container">
      <div className='header'>
            <div className='functionBar'><button className="btn" onClick={toggleShowMe}>&#9776;</button></div>
            <div className='title'>
                <h1 id="title1">Lotion</h1>
                <p id="title2">Like Notion, but worse</p>
            </div>
        </div>
    <div className="container2">
      {sideBar &&(
    <div className="SideBar">
      <div className="SideBarMenu">
        <SideBar notes ={notes} onAddNote={onAddNote} activeNote={getActiveNote} setActiveNote={setActiveNote}/>
      </div>
  </div>)}
  <div className="MainContent">
      <div id="Blank"> Select a note, or create a new one</div>
        </div>
    </div>
    </div>
    );
    }
    if (mode.mode === "read"){
    {/*this.state.showMe?
    <div className="SideBar">
    <div className="SideBarMenu">
      <SideBar notes ={notes} onAddNote={onAddNote} activeNote={activeNote} setActiveNote={setActiveNote}/>
    </div>
</div>
:null
  */}
    return (
      <div className="ui container">
        <div className='header'>
              <div className='functionBar'><button className="btn" onClick={toggleShowMe}>&#9776;</button></div>
              <div className='title'>
                  <h1 id="title1">Lotion</h1>
                  <p id="title2">Like Notion, but worse</p>
              </div>
          </div>
      <div className="container2">
        {sideBar &&(
      <div className="SideBar">
        <div className="SideBarMenu">
          <SideBar notes ={notes} onAddNote={onAddNote} activeNote={activeNote} setActiveNote={setActiveNote}/>
        </div>
    </div>)}
    <div className="MainContent">
    <Read notes ={notes} onDeleteNote={onDeleteNote} activeNote={getActiveNote()} onUpdateNote={onUpdateNote}/>
          </div>
      </div>
      </div>
      );
      }
      return (
        <div className="ui container">
        <div className='header'>
              <div className='functionBar'><button className="btn" onClick={toggleShowMe}>&#9776;</button></div>
              <div className='title'>
                  <h1 id="title1">Lotion</h1>
                  <p id="title2">Like Notion, but worse</p>
              </div>
          </div>
      <div className="container2">
        {sideBar &&(
      <div className="SideBar">
        <div className="SideBarMenu">
          <SideBar notes ={notes} onAddNote={onAddNote} activeNote={activeNote} setActiveNote={setActiveNote}/>
        </div>
    </div>)}
    <div className="MainContent">
    <MainContent notes ={notes} onDeleteNote={onDeleteNote} activeNote={getActiveNote()} onUpdateNote={onUpdateNote}/>
          </div>
      </div>
      </div>
      );

}

export default App;
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