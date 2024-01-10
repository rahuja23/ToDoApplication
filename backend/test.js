fetch("http://localhost:3000/todos").then(async function(res){
    const json= await res.json();
    console.log(json)
  })