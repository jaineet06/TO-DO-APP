import { useState, useEffect} from "react"

const ToDoApp = () => {

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(e){
        setNewTask(e.target.value);
    }

    function addTask(){
        if(newTask.trim() !== ""){
        setTasks(t => [...t, newTask]);
        setNewTask("");
        }
    }

    function deleteTask(index){
        const updatedTasks = [...tasks];
        setTasks(updatedTasks.filter((_, i) => i !== index));
    }

    function moveUp(index){
        if(index > 0){
        const updatedTask = [...tasks];
        [updatedTask[index], updatedTask[index-1]] = [updatedTask[index-1], updatedTask[index]];
        setTasks(updatedTask);
        }
    }

    function moveDown(index){
        if(index < tasks.length - 1){
        const updatedTask = [...tasks];
        [updatedTask[index], updatedTask[index + 1]] = [updatedTask[index + 1], updatedTask[index]];
        setTasks(updatedTask);
        }
    }


    return(
        <div className="container">
            <h1 className="title">To-Do-List</h1>
            <div className="input">
                <input type="text" value={newTask} 
                onChange={handleInputChange}
                placeholder="Enter your task here..." />
                <button className="add-btn" onClick={addTask}>Add</button>
            </div>
            <ol>
                {tasks.map((task, index) => 
                           <li key={index}>
                            <span className="text">{task}</span>
                           <button onClick={() => deleteTask(index)}>Delete</button>
                           <button onClick={() => moveUp(index)}>Up</button>
                           <button onClick={() => moveDown(index)}>Down</button>
                           </li>)}
            </ol>
        </div>
    );
}

export default ToDoApp