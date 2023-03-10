import React ,{useState}from "react";
import './SideBar.css';
import {useNavigate} from "react-router-dom";

const SideBar = ({notes,onAddNote, activeNote, setActiveNote}) => {
    //let index = notes.map((note)=>{if(note.id===activeNote){return note.index}})
    const sorted = notes.sort((a,b)=>b.lastModified-a.lastModified);
    const navigate=useNavigate();
    function showNode(id){
        //let index = notes.map((note)=>{if(note.id===activeNote){return note.index}});
        let index_1 = notes.indexOf(notes.find((note)=>note.id===id));
        navigate(`/notes/`+index_1+1);
        setActiveNote(id);
       
        
        
    }
    
    return(
    <div className="Bar">
            <div className="SideBarTitle">
                <h3 className="Notes"><b>Notes</b></h3>
                <button className="PlusButton" onClick={onAddNote}>&#10133;</button>
                {/*<AddNote onAddNote={onAddNote}/>*/}
            </div>
            {notes.length===0 && <div className="NoNoteYet">No Note Yet</div>}
            {sorted.map(({index,id,title,body,noteTime},i) => (
                    <div className={`SideBarNote ${id === activeNote && "active"}`} onClick={()=>showNode(id)}>
                        <div className="SideBarNoteTile">
                            <h4>{title}</h4>
                            <small className="note-meta">{noteTime}</small>
                            <p className="SmallBarContent">{body && body.substr(0, 100).replace(/(<([^>]+)>)/gi,"") + "..."}</p>
                </div>
                    </div>))}

        </div>
        );
           

};

export default SideBar;
function index(notes, activeNote){
    notes.map((note)=>{
        if(note.id===activeNote){
            index=note.index;
        }
    });
    return index;

}