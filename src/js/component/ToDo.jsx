import React, { useState, useEffect } from "react";

const urlBase = "https://playground.4geeks.com/todo"

const initialTask = {
    label: '',
    is_done: false
}

const ToDo = () => {

    const [task, setTask] = useState(initialTask)
    const [taskList, setTaskList] = useState([])

    const handelChange = ({ target }) => {
        setTask({
            ...task,
            [target.name]: target.value
        })
        
    }
        const getAllTask = async () => {
            try {
                const responde = await fetch(`${urlBase}/users/cristopher`)
                const data = await responde.json()

                if (responde.ok) {
                    setTaskList(data.todos)
                } else {
                    createUser()
                }

            } catch (error) {
                console.log(error)
            }
            
        }

        const createUser = async()=>{
            try {
             const response = await fetch(`${urlBase}/users/cristopher`,{
                method: "POST"
                
             })  
             console.log(response)
            } catch (error) {
             console.log(error)   
            }
        }

        const addTask = async(event) =>{
            if(event.key == "Enter"){
                try {
                    const responde = await fetch(`${urlBase}/todos/cristopher`,{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify(task)

                    })
                    if(responde.ok){
                        getAllTask()
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            
        }
                

        const deleteTask = async(id) =>{
            try {
                const response = await fetch(`${urlBase}/todos/${id}`,{
                    method:"DELETE"
                })
                if(response.ok){
                    getAllTask()
                }
            } catch (error) {
                console.log(error)
            }
        }
       
      
        useEffect(()=>{
            getAllTask()
        },[])

      
        

        return (
            <>
            <body>
                <div className="container ">
                    <div className="row center ">
                        <div className="col-12 col-md-7  card mt-3 silhouette">
                            <h1>To Do List</h1>
                            <form onSubmit={(event)=> event.preventDefault()}>
                                <input type="text"
                                    placeholder="Añada su tarea"
                                    className="form-control textColor p-3"
                                    name="label"
                                    value={task.label}
                                    onKeyDown={addTask}
                                    onChange={handelChange}
                                

                                />
                            </form >
                            {
                               
                                
                                taskList.map((item) => {
                                    return(
                                    <div className="select p-4 textColor border" onClick={()=>deleteTask(item.id)} key={item.id}>
                                        {item.label}<span className="icon-delete">x</span>                                                                   
                                    </div>
                                    
                                    )
                                })
                            }
                            <p className="textColor pt-3">{taskList.length == 0 ? "No tienes mas tareas " : taskList.length +" "+"tareas pendientes" }</p>
                        </div>
                    </div>
                </div>
                </body>
            </>
        );
    
}

    export default ToDo;