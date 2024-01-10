export function Todos({ todos}) { // Default to an empty array if todos is not provided
    // Check if todos is an array and has items
    if (!Array.isArray(todos)) {
        console.error('Invalid todos prop:', todos);
        return <div></div>;
    }   
    
    const handleComplete = (todoId) => {
        console.log("Sending ID:", todoId); // Debug: Log the ID being sent
    
        fetch("http://localhost:3000/completed", {
            method: "PUT",
            body: JSON.stringify({ id: todoId }),
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
        .then(data => {
            alert(`To Do marked as completed`);
            console.log("Response data:", data); // Debug: Log the response data
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    

    return (
        <div >
            {todos.map(todo => (
                <div  key={todo._id}>
                    <h1>{todo.title}</h1>
                    <h2>{todo.description}</h2>
                    <button  onClick={()=> handleComplete(todo._id)}>
                        {todo.completed === true ? "Completed" : "Mark as Complete"}
                    </button>
                </div>
            ))}
        </div>
    );
}
