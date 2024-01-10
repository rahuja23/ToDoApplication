export function Flush(){
    const flush= ()=>{
         fetch("http://localhost:3000/flush", {
            method: "DELETE",
            body: JSON.stringify({}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

    }
    return <div>
        <button onClick={()=>flush()}> DELETE ALL TODOs</button>
    </div>
}