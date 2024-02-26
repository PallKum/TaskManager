
import { useEffect, useState } from 'react'
import { GrFormTrash } from "react-icons/gr";
import axios from 'axios';
import './Task.css'

const Task=({user})=>{
     const [newTask,setNewTask]=useState();
    const [toDoList, setToDoList] = useState([]);
    const [ongoingList,setOngoingList]=useState([]);
    const [completedList,setCompletedList]=useState([]);
    const [sourceList,setSourceList]=useState("")
    const [TaskId,setTaskId]=useState()
 useEffect(()=>{
    const userId=user.id;
    const fetchData = async () => {
        try {
        const response = await axios.get(`http://localhost:8080/taskApp/get/${userId}`,{
            headers: {
              'Content-Type': 'application/json'
            }})
             setToDoList(response.data.filter(task => task.taskStatus === "todo"));
            setOngoingList(response.data.filter(task => task.taskStatus === "ongoing"));
             setCompletedList(response.data.filter(task => task.taskStatus === "completed"))
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
},[])

const handleDragStart = (event, taskName,status) => {
    event.dataTransfer.setData("text/plain", taskName);
    setSourceList(status);
    setTaskId(taskName.id);
};

const handleDrop  = async(event, status) => {


    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");

    try {
            const response = await axios.put(`http://localhost:8080/task/updateTask/${TaskId}`,status,{
            headers: {
              'Content-Type': 'text/plain'
            }})
        if (response.status === 200) {
            if (status === "todo") {
                setToDoList([...toDoList, taskId]);
            } else if (status === "ongoing") {
                setOngoingList([...ongoingList, taskId]);
            } else if (status === "completed") {
                setCompletedList([...completedList, taskId]);
            }
            if (sourceList === "todo") {
                setToDoList(toDoList.filter(task => task !== taskId));
            } else if (sourceList === "ongoing") {
                setOngoingList(ongoingList.filter(task => task !== taskId));
            } else if (sourceList === "completed") {
                setCompletedList(completedList.filter(task => task !== taskId));
            }

            window.location.reload();
            setSourceList("");
            setTaskId("");
        } else {
            console.error('Failed to update task status.');
        }
    } catch (error) {
        console.error('Error updating task status:', error);
    }

     
 
};

const  handleDragOver = (event) => {
    event.preventDefault();
};

  
const handleDelete = async (task,status)=>{
  const TaskId=task.id;
  console.log(TaskId+"id")
const fetchdata= await axios.delete(`http://localhost:8080/task/deleteTask/${TaskId}`)
    if(status==="todo"){
        setToDoList(toDoList.filter(taskName=>task!==taskName))
    }
    if(status==="ongoing")
    {setOngoingList(ongoingList.filter(taskName=>task!==taskName))}
    if(status==="completed")
    {setCompletedList(completedList.filter(taskName=>task!==taskName))}

 }

 const handleKeyDown = (event) => {
    if (event.key === 'Enter' && newTask.trim() !== '') {
        console.log('Task name:', newTask);
     setToDoList([...toDoList,newTask])
     const data={"taskName":newTask,"taskStatus":"todo","user":user}
     const fetchData = async () => {
        try {
        const response = await axios.post("http://localhost:8080/task/Add",data,{
            headers: {
              'Content-Type': 'application/json'
            }})
            console.log("response"+response)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
     fetchData();
     window.location.reload()
        setNewTask('');
    }
};

const handleChange = (event) => {
    setNewTask(event.target.value);
};


  
   return (
    <div >
        <div className='TaskContainer'>
            <div className='TaskStatus'><h3>TO-DO</h3>
                 <div  className="task-list" onDragOver={e=>handleDragOver(e)}  onDrop={(event) => handleDrop(event, 'todo')} >
                    {toDoList.map((task, index) => (
                            <li key={index} draggable onDragStart={(event) => handleDragStart(event, task,"todo")}>
                                  <GrFormTrash
                                    onClick={() => handleDelete(task,'todo')}
                                  ></GrFormTrash>
                                  {task.taskName}</li>
                        ))}
                 </div>
            
            </div>
            <div className='TaskStatus'><h3>ONGOING</h3>
            
            <div  className="task-list" onDrop={(event) => handleDrop(event, 'ongoing')} onDragOver={handleDragOver}>
              {ongoingList.map((task, index) => (
                            <li key={index} draggable onDragStart={(event) => handleDragStart(event, task,"ongoing")}>
                                                    <GrFormTrash
                      onClick={() => handleDelete(task,'ongoing')}
                    ></GrFormTrash>
                                
                                {task.taskName}
                                
                                </li>
                        ))}
              </div>
            
            </div>
            <div className='TaskStatus'><h3>COMPLETED</h3>
            
              <div  className="task-list" onDrop={(event) => handleDrop(event, "completed")} onDragOver={handleDragOver}>
              {completedList.map((task, index) => (
                            <li key={index} draggable onDragStart={(event) => handleDragStart(event, task,"completed")}>
                                   <GrFormTrash
                      onClick={() => handleDelete(task,"completed")}
                    ></GrFormTrash>
                                {task.taskName}</li>
                        ))}
              </div>
            
            
            </div>
        </div>

       <input 
       style={{borderColor:"#75306C"}}
       className='Task-input'
       placeholder='Add Task'
            value={newTask}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
       ></input>


    </div>

  );
}



export default Task