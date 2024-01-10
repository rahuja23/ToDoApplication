import { useState } from "react";

export function CreateTodo(){
    const [title, SetTitle]= useState("");
    const [description, SetDescription]= useState("");

    return <div>
        <input id= "Title" style={{padding:10, margin: 10}} type="text" placeholder="Title" onChange={function(e){
            const value= e.target.value;
            console.log(`value Title: ${value}`)
            SetTitle(e.target.value);
        }}></input> <br/>
        <input id= "Description" style={{padding:10, margin: 10}} type="text" placeholder="Description" onChange={function(e){
            const value = e.target.value;
            console.log(`value Title: ${value}`)
            SetDescription(e.target.value)
        }}></input> <br/>
        <button onClick={()=>{
            fetch("http://localhost:3000/todo", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description:  description
                }),
                headers:{
                    "Content-type": "application/json"
                }
            }).then(async function(res){
                const json = await res.json();
                alert(`To Do : ${json} added`)
            })
        }} style={{padding:10, margin: 10} }> Add a Todo </button>
    </div>
} 